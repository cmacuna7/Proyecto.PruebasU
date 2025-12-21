import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from './cliente';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private apiUrl = 'http://localhost:3000/api/clientes';

    constructor(private http: HttpClient) { }

    getClientes(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(this.apiUrl);
    }

    getCliente(id: number): Observable<Cliente> {
        return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
    }

    addCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(this.apiUrl, cliente);
    }

    updateCliente(cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(`${this.apiUrl}/${cliente.id}`, cliente);
    }

    deleteCliente(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
