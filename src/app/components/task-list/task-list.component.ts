import { Project } from './../../models/project';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  tasks!: Task[];
  btnDisabled = false;
  urlProject = 'http://localhost:8686/v1/api/projects';
  url = 'http://localhost:8686/v1/api/tasks';
  deleteId!: string;
  confirmMessage = '';

  constructor(
    private rest: RestApiService,
    private data: DataService,
    private modalService: NgbModal
  ) {}

  confirmDeleteProject(
    confirmDialog: TemplateRef<any>,
    id: string,
    name: string
  ) {
    this.confirmMessage = `Do you want to the task ${name}`;
    this.deleteId = id;
    this.modalService
      .open(confirmDialog, { ariaDescribedBy: 'model-basic-title' })
      .result.then(
        (result) => {
          this.deleteId = '';
        },
        (err) => {}
      );
  }

  deleteProject() {
    if (this.deleteId !== '') {
      this.rest
        .delete(this.url, this.deleteId)
        .then((data) => {
          this.modalService.dismissAll();
          this.ngOnInit();
        })
        .catch((err) => {
          this.data.error(err['message']);
        });
    }
  }

  ngOnInit(): void {
    this.btnDisabled = true;
    this.rest
      .get(this.url)
      .then((data) => {
        this.tasks = (data as { data: Task[] }).data;
        this.btnDisabled = false;
      })
      .catch((error) => {
        this.data.error(error['message']);
        this.btnDisabled = false;
      });

    
  }

  finishAndAlert(message: string) {
    this.data.success(message);
    this.ngOnInit();
  }
}
