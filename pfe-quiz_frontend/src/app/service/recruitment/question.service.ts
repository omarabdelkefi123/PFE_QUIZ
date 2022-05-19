import { Injectable } from '@angular/core';
//import
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from 'src/app/models/recruitment/Question';



@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createquestion(question: Question): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/question/add`, question);
  }
  getquestionsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/question/liste`);
  }
  getquestion(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/question/${id}`);
  }
  deletequestion(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/question/delete/${id}`);
  }
  updatequestion(question: Question): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/question/update`, question);
  }
}
