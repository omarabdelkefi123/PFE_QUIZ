import { Injectable } from '@angular/core';
//import
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Test } from 'src/app/models/recruitment/Test';




@Injectable({
  providedIn: 'root'
})
export class TestService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createtest(test: Test): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/test/add`, test);
  }
  gettestsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/test/liste`);
  }
  gettest(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/test/${id}`);
  }
  deletetest(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/test/delete/${id}`);
  }
  updatetest(test: Test): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/test/update`, test);
  }
  sendTestToStudent(student, test, dateExpiration): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/student/sendtest`, { student: student, test: test, dateExpiration: dateExpiration });
  }
}
