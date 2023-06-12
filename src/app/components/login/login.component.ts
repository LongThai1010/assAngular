import { RestApiService } from './../../services/rest-api.service';
import { DataService } from './../../services/data.service';
import { Employee } from './../../models/employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  employee: Employee;
  btnDisabled = false;
  url = 'http://localhost:8686/v1/api/accounts/login';
  constructor(
    private rest: RestApiService,
    private data: DataService,
    private router: Router,
    private toast: ToastrService
  ) {
    this.employee = new Employee();
  }
  ngOnInit(): void {}
  validate() {
    return true;
  }

  async login() {
    this.btnDisabled = true;
    if (this.validate()) {
      this.rest
        .post(this.url, this.employee)
        .then(async (data) => {
          let value = data as { employeeId: string; token: string };

          localStorage.setItem('token', value.token);
          await this.data.getProfile();
          this.toast.success(`Thành công`, 'Đăng nhập!', {
            timeOut: 2500,
            progressBar: true,
            progressAnimation: 'decreasing',
            closeButton: true,
            positionClass: 'toast-top-right',
            // enableHtml: true,
            // tapToDismiss: false,
            easeTime: 200,
          });
          this.router.navigate(['/']);
        })

        .catch((error) => {
          this.toast.error(`${error.error.message}`, 'Thất bại!', {
            timeOut: 2000,
            progressBar: true,
            progressAnimation: 'decreasing',
            closeButton: true,
            positionClass: 'toast-top-right',
            enableHtml: true,
            tapToDismiss: false,
            easeTime: 200,
          });
          this.btnDisabled = false;
        });
    }
  }
}
