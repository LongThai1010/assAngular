import { DataService } from 'src/app/services/data.service';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Project } from './../../models/project';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.css'],
})
export class ProjectAddComponent implements OnInit {
  @Output()
  savingFinished: EventEmitter<string> = new EventEmitter<string>();
  saving = false;
  project: Project;
  url = 'http://localhost:8686/v1/api/projects';

  constructor(
    private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService
  ) {
    this.project = new Project();
  }

  ngOnInit() {}
  open(content: TemplateRef<any>) {
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' });
  }

  save() {
    this.saving = true;

    this.rest
      .post(this.url, this.project)
      .then((data) => {
        this.saving = false;
        this.savingFinished.emit('New project is Saved');
        this.modelService.dismissAll();
        this.project = new Project();
      })
      .catch((error) => {
        this.saving = false;
        this.data.error(error['message']);
      });
  }
}
