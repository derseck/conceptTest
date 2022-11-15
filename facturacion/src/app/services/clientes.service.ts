import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clientes } from '../interfaces/clientes';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Clientes[]> {
    return this.http.get<Clientes[]>('http://localhost:8000/cliente')
  }

  getCliente(id: number): Observable<Clientes> {
    return this.http.get<Clientes>('http://localhost:8000/cliente/'+id)
  }

  delete(id: number): Observable<Clientes[]> {
    return this.http.delete<Clientes[]>('http://localhost:8000/cliente/'+id)
  }

  insert(cliente: Clientes): Observable<Clientes[]> {
    return this.http.post<Clientes[]>('http://localhost:8000/cliente', cliente)
  }

  update(id: number, cliente: Clientes) {
    return this.http.put('http://localhost:8000/cliente/'+id, cliente)
  }

}
