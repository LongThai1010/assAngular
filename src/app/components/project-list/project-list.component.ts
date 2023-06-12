import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';
import { Project } from './../../models/project';
import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
})
export class ProjectListComponent implements OnInit {
  projects!: Project[];
  btnDisabled = false;
  url = 'http://localhost:8686/v1/api/projects';
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
    this.confirmMessage = `Do you want to the project ${name}`;
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

  ngOnInit() {
    this.btnDisabled = true;
    this.rest
      .get(this.url)
      .then((data) => {
        this.projects = (data as { data: Project[] }).data;
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

  dataSearch: string = '';
  projectSearch: any = [];

  get listFilter() {
    return this.dataSearch;
  }

  set listFilter(value: string) {
    this.dataSearch = value;
    this.projects = this.projectSearch.filter((project: any) => project.name.toLowerCase().includes(this.listFilter.toLowerCase()));
  }



  // delete(id: string) {
  //   this.rest
  //     .delete(this.url, id)
  //     .then((data) => {
  //       this.data.success((data as { message: string }).message);
  //       this.btnDisabled = false;

  //       this.ngOnInit();
  //     })
  //     .catch((error) => {
  //       this.data.error(error['message']);
  //       this.btnDisabled = false;
  //     });
  // }
}
