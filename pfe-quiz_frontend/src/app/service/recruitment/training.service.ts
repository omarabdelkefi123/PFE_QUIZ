import { Injectable } from '@angular/core';
//import
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from 'src/app/models/recruitment/Training';




@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createtraining(training: Training): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/training/add`, training);
  }
  gettrainingsList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/training/liste`);
  }
  gettraining(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/training/${id}`);
  }
  deletetraining(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/training/delete/${id}`);
  }
  updatetraining(training: Training): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/training/update`, training);
  }
}
