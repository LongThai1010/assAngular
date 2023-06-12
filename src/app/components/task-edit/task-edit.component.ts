import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();
  doing = false;
  task: Task;
  url = 'http://localhost:8686/v1/api/tasks';

  @Input('id')
  editId!: string;

  constructor(
    private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService
  ) {
    this.task = new Task();
  }

  ngOnInit() {
    this.doing = true;

    this.rest
      .getOne(this.url, this.editId)
      .then((data) => {
        this.doing = false;
        this.task = (data as { data: Task }).data;
      })
      .catch((error) => {
        this.doing = false;
        this.data.error(error['message']);
      });
  }
  open(content: TemplateRef<any>) {
    this.data.message = '';
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' });
  }

  update() {
    this.doing = true;

    this.rest
      .put(this.url, this.editId, this.task)
      .then((data) => {
        this.doing = false;
        this.updateFinished.emit('New task is Updated');
        this.modelService.dismissAll();
        this.task = new Task();
      })
      .catch((error) => {
        this.doing = false;
        this.data.error(error['message']);
      });
  }

}
