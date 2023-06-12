import { Component } from '@angular/core';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  employee: Employee = new Employee();
}
