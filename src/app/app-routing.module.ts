import { TaskListComponent } from './components/task-list/task-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  // { path: '', component: HomeComponent },
  { path: 'employee-add', component: EmployeeAddComponent },
  { path: 'employee-list', component: EmployeeListComponent },
  { path: 'employee-edit/:id', component: EmployeeEditComponent },

  // login
  { path: 'login', component: LoginComponent },

  // project-list
  { path: 'project-list', component: ProjectListComponent },

  // task-list
  { path: 'task-list', component: TaskListComponent },

  // profile
  { path: 'profile', component: ProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
