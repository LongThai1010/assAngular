import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees!: Employee[];
  btnDisabled = false;
  url = 'http://localhost:8686/v1/api/accounts';
  constructor(private rest: RestApiService, private data: DataService) {}
  ngOnInit(): void {
    this.btnDisabled = true;
    this.rest
      .get(this.url)
      .then((data) => {
        this.employees = (data as { employees: Employee[] }).employees;
        this.btnDisabled = false;
      })
      .catch((error) => {
        this.data.error(error['message']);
        this.btnDisabled = false;
      });
  }

  delete(id: string) {
    this.rest
      .delete(this.url, id)
      .then((data) => {
        this.data.success((data as { message: string }).message);
        this.btnDisabled = false;

        this.ngOnInit();
      })
      .catch((error) => {
        this.data.error(error['message']);
        this.btnDisabled = false;
      });
  }
}
