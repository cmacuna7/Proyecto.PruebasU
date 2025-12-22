import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auto } from './auto';

@Injectable({
  providedIn: 'root'
})
export class AutoService {
  private baseUrl = 'http://localhost:3000/api/autos';

  constructor(private http: HttpClient) {}

  getAutos(): Observable<Auto[]> {
    return this.http.get<Auto[]>(this.baseUrl);
  }

  getAuto(id: number): Observable<Auto> {
    return this.http.get<Auto>(`${this.baseUrl}/${id}`);
  }

  addAuto(auto: Auto): Observable<Auto> {
    return this.http.post<Auto>(this.baseUrl, auto);
  }

  updateAuto(auto: Auto): Observable<Auto> {
    return this.http.put<Auto>(`${this.baseUrl}/${auto.id}`, auto);
  }

  deleteAuto(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
