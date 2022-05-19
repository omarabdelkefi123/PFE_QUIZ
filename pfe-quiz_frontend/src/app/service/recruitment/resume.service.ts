import { Injectable } from '@angular/core';
//import
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resume } from 'src/app/models/recruitment/Resume';


@Injectable({
  providedIn: 'root'
})
export class ResumeService {Question
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createresume(resume: Resume): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/resume/add`, resume);
  }
  getresumesList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/resume/liste`);
  }
  getresume(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/resume/${id}`);
  }
  deleteresume(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/resume/delete/${id}`);
  }
  updateresume(resume: Resume): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/resume/update`, resume);
  }
}
