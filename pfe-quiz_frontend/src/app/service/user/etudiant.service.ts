import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EtudiantService {
  getetudiant(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/etudiant/${id}`);
  }
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient,) { }
  getetudiantList(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/etudiant/liste`);
  }
  addetudiant(etudiant): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/etudiant/create`, etudiant);
  }
  deleteetudiant(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/etudiant/delete/${id}`);
  }
  updateetudiant(etudiant): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/etudiant/update`, etudiant);
  }
}
