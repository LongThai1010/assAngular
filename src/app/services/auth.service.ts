import { RestApiService } from './rest-api.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'http://localhost:8686/v1/api/accounts';
  urlArea = 'http://localhost:8686/v1/api/area';
  urlProject = 'http://localhost:8686/v1/api/projects';
  token: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private rest: RestApiService
  ) {}

  loginSuccess: EventEmitter<any> = new EventEmitter();

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  signup(dataForm: object) {
    return this.http.post(this.url, dataForm);
  }

  login(dataForm: object) {
    return this.http.post(this.url + 'login', dataForm);
  }

  getAllArea() {
    return this.http.get(this.urlArea, {
      headers: new HttpHeaders().set('SECRET', this.getToken()),
    });
  }

  getAllProject() {
    return this.http.get(this.urlProject, {
      headers: new HttpHeaders().set('SECRET', this.getToken()),
    });
  }

  // Authentication
  // public isAuthenticated(): boolean {
  //   const jwtHelper = new JwtHelperService();
  //   if(this.token===null)
  //   return false;
  //   return !jwtHelper.isTokenExpired(this.token);
  //   }

}
