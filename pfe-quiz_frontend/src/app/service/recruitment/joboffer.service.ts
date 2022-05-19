import { Injectable } from '@angular/core';
//import
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobOffer } from 'src/app/models/recruitment/JobOffer';

@Injectable({
  providedIn: 'root'
})
export class JobOfferService {
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  createjobOffer(jobOffer: JobOffer): Observable<Object> {
    return this.http.post(`${this.baseUrl}` + `/jobOffer/add`, jobOffer);
  }
  getjobOffersList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/jobOffer/liste`);
  }
  getjobOffer(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/jobOffer/${id}`);
  }
  deletejobOffer(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/jobOffer/delete/${id}`);
  }
  updatejobOffer(jobOffer: JobOffer): Observable<Object> {
    return this.http.put(`${this.baseUrl}` + `/jobOffer/update`, jobOffer);
  }
}
