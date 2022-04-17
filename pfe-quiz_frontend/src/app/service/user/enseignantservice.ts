import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnseignantService {
  getEnseignant(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/enseignant/${id}`);
  }
  private baseUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) { }
  getEnseignants(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + `/allenseignants/liste`);
  }
  addEnseignant(enseignant): Observable<any> {
    return this.http.post(`${this.baseUrl}` + `/enseignant/create`, enseignant);
  }
  deleteEnseignant(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + `/enseignant/delete/${id}`);
  }
  updateEnseignant(enseignant): Observable<any> {
    return this.http.put(`${this.baseUrl}` + `/enseignant/update`, enseignant);
  }
}
