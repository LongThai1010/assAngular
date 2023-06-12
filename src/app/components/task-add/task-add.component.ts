import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { Task } from 'src/app/models/task';
import { Project } from 'src/app/models/project';
import { AuthService } from 'src/app/services/auth.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
})
export class TaskAddComponent implements OnInit {
  @Output()
  savingFinished: EventEmitter<string> = new EventEmitter<string>();
  saving = false;
  task: Task;
  employees!: Employee[];
  projects!: Project[];
  urlProject = 'http://localhost:8686/v1/api/projects';
  urlEmployee = 'http://localhost:8686/v1/api/accounts';
  url = 'http://localhost:8686/v1/api/tasks';


  constructor(
    private modelService: NgbModal,
    private rest: RestApiService,
    private data: DataService,
    private authService: AuthService
  ) {
    this.task = new Task();
  }

  open(content: TemplateRef<any>) {
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' });
  }

  getAllProjects() {
    this.rest
      .get(this.urlProject)
      .then((data) => {
        this.projects = (data as { data: Project[] }).data;
      })
      .catch((error) => {
        this.data.error(error['message']);
      });
  }

  getAllEmployees() {
    this.rest
    .get(this.urlEmployee)
    .then((data) => {
      this.employees = (data as { data: Employee[] }).data;
    })
    .catch((error) => {
      this.data.error(error['message']);
    });
  }

  save() {
    this.saving = true;
    this.getAllProjects();
    this.getAllEmployees();
    this.rest
      .post(this.url, this.task)
      .then((data) => {
        this.saving = false;
        this.savingFinished.emit('New Task is Saved');
        this.modelService.dismissAll();
        this.task = new Task();
      })
      .catch((error) => {
        this.saving = false;
        this.data.error(error['message']);
      });
  }
  ngOnInit(): void {

    this.getAllProjects();
    this.getAllEmployees();
  }

}
