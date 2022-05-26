import { Injectable } from '@angular/core';
//import
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TestEvaluation } from 'src/app/models/recruitment/TestEvaluation';

@Injectable({
  providedIn: 'root'
})
export class TestEvaluationService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createTestEvaluation(TestEvaluation: TestEvaluation): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/testevaluation/add`, TestEvaluation);
  }
  getTestEvaluationsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/testevaluation/liste`);
  }
  getTestEvaluation(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/testevaluation/${id}`);
  }
  deleteTestEvaluation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/testevaluation/delete/${id}`);
  }
  updateTestEvaluation(TestEvaluation: TestEvaluation): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/testevaluation/update`, TestEvaluation);
  }
}
