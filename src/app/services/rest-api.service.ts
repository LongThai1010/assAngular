import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestApiService {
  constructor(private http: HttpClient) {}

  getHeaders() {
    const token = localStorage.getItem('token');

    return token
      ? new HttpHeaders().set('Authorization', 'Bearer ' + token)
      : null;
  }

  get(link: string) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.get(link, { headers: headers }).toPromise();

    return this.http.get(link).toPromise();
  }

  getOne(link: string, id: string) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http.get(link + '/' + id, { headers: headers }).toPromise();

    return this.http.get(link + '/' + id).toPromise();
  }

  async post(link: string, body: any) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return await firstValueFrom(
        this.http.post(link, body, { headers: headers })
      );

    return await firstValueFrom(this.http.post(link, body));
  }

  put(link: string, id: string, body: any) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http
        .put(link + '/' + id, body, { headers: headers })
        .toPromise();

    return this.http.put(link + '/' + id, body).toPromise();
  }

  delete(link: string, id: string) {
    let headers = this.getHeaders();
    if (headers instanceof HttpHeaders)
      return this.http
        .delete(link + '/' + id, { headers: headers })
        .toPromise();

    return this.http.delete(link + '/' + id).toPromise();
  }
}
