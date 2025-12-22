import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Concesionaria } from './concesionaria';

@Injectable({
  providedIn: 'root'
})
export class ConcesionariaService {
  private baseUrl = 'http://localhost:3000/api/concesionarias';

  constructor(private http: HttpClient) {}

  getConcesionarias(): Observable<Concesionaria[]> {
    return this.http.get<Concesionaria[]>(this.baseUrl);
  }

  getConcesionaria(id: number): Observable<Concesionaria> {
    return this.http.get<Concesionaria>(`${this.baseUrl}/${id}`);
  }

  addConcesionaria(concesionaria: Concesionaria): Observable<Concesionaria> {
    return this.http.post<Concesionaria>(this.baseUrl, concesionaria);
  }

  updateConcesionaria(concesionaria: Concesionaria): Observable<Concesionaria> {
    return this.http.put<Concesionaria>(`${this.baseUrl}/${concesionaria.id}`, concesionaria);
  }

  deleteConcesionaria(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
