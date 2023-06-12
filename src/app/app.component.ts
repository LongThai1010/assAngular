import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
  title = 'Manager Fpoly';
  constructor(
    public data: DataService,
    private router: Router,
    private toast: ToastrService,
    private modelService: NgbModal
  ) {
    this.data.getProfile();
  }
  open(content: TemplateRef<any>) {
    this.modelService.open(content, { ariaDescribedBy: 'modal-basic-title' });
  }
  logout() {
    this.data.employee = null;
    localStorage.clear();
    this.toast.success(`Thành công`, 'Đăng Xuất!', {
      timeOut: 2500,
      progressBar: true,
      progressAnimation: 'decreasing',
      closeButton: true,
      positionClass: 'toast-top-right',
      // enableHtml: true,
      // tapToDismiss: false,
      easeTime: 300,
    });
    this.router.navigate(['/login']);
  }
}
