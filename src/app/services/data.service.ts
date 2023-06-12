import { Injectable } from '@angular/core';
import { RestApiService } from './rest-api.service';
import { Router, NavigationStart } from '@angular/router';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  message = '';
  messageType = 'danger';

  employee!: Employee | null;
  constructor(private router: Router, private rest: RestApiService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.message = '';
      }
    });
  }

  async getProfile() {
    try {
      if (localStorage.getItem('token')) {
        const data = await this.rest.get(
          'http://localhost:8686/v1/api/accounts/get/profile'
        );
        this.employee = (data as { employee: Employee }).employee;
      }
    } catch (err) {}
  }

  error(message: string) {
    this.messageType = 'danger';
    this.message = message;
  }

  success(message: string) {
    this.messageType = 'success';
    this.message = 'Thanh cong';
  }

  warning(message: string) {
    this.messageType = 'warning';
    this.message = message;
  }
}
