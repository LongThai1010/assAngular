import { Project } from './../../models/project';
import { DataService } from './../../services/data.service';
import { RestApiService } from './../../services/rest-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
})
export class ProjectEditComponent implements OnInit {
  @Output()
  updateFinished: EventEmitter<string> = new EventEmitter<string>();
  doing = false;
  project: Project;
  url = 'http://localhost:8686/v1/api/projects';

  @Input('id')
  editId!: string;

  constructor(
    private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService
  ) {
    this.project = new Project();
  }

  ngOnInit() {
    this.doing = true;

    this.rest
      .getOne(this.url, this.editId)
      .then((data) => {
        this.doing = false;
        this.project = (data as { data: Project }).data;
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
      .put(this.url, this.editId, this.project)
      .then((data) => {
        this.doing = false;
        this.updateFinished.emit('New project is Updated');
        this.modelService.dismissAll();
        this.project = new Project();
      })
      .catch((error) => {
        this.doing = false;
        this.data.error(error['message']);
      });
  }
}
