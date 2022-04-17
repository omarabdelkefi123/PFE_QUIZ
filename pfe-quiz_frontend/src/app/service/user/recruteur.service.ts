import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class recruteurService {
  getrecruteur(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/recruteur/${id}`);
  }
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient,) { }
  getrecruteurList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/recruteur/liste`);
  }
  addrecruteur(recruteur): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/recruteur/create`, recruteur);
  }
  deleterecruteur(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/recruteur/delete/${id}`);
  }
  updaterecruteur(recruteur): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/recruteur/update`, recruteur);
  }
}
