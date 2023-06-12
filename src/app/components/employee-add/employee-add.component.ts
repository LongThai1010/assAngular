import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';
import { DataService } from 'src/app/services/data.service';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
})
export class EmployeeAddComponent implements OnInit {
  areas: any = [];
  employee: Employee;
  btnDisabled = false;
  url = 'http://localhost:8686/v1/api/accounts';
  constructor(
    private rest: RestApiService,
    private data: DataService,
    private toast: ToastrService,
    private authService: AuthService,
    private router: Router
  ) {
    this.employee = new Employee();
  }

  validate() {
    return true;
  }

  onSubmit(dataForm: NgForm) {
    this.authService.signup(dataForm.value).subscribe(
      (res: any) => {
        this.toast.success(`${res.message}!`, 'Thành công!', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
          positionClass: 'toast-top-right',
          enableHtml: true,
          tapToDismiss: false,
          easeTime: 200,
        });

        this.router.navigate(['login']);
      },
      (err) => {
        this.toast.error(`${err.error.message}!`, 'Thất bại!', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
          positionClass: 'toast-top-right',
          enableHtml: true,
          tapToDismiss: false,
          easeTime: 200,
        });
      }
    );
  }

  getAllArea() {
    this.authService.getAllArea().subscribe((res: any) => {
      this.areas = res.areas;
    });
  }

  ngOnInit(): void {
    this.getAllArea();
  }
}
