import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orden } from '../interfaces/orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  constructor(private http: HttpClient) { }

  getOrden(): Observable<Orden[]> {
    return this.http.get<Orden[]>('http://localhost:8000/orden')
  }

  getOrdenById(id: number): Observable<Orden> {
    return this.http.get<Orden>('http://localhost:8000/orden/'+id)
  }

  getOrdenByClient(id: number): Observable<Orden[]> {
    return this.http.get<Orden[]>('http://localhost:8000/orden/cliente/'+id)
  }

  delete(id: number) {
    return this.http.delete('http://localhost:8000/orden/'+id)
  }

  insert(orden: Orden): Observable<Orden[]> {
    return this.http.post<Orden[]>('http://localhost:8000/orden', orden)
  }

  update(id: number, orden: Orden) {
    return this.http.put('http://localhost:8000/orden/'+id, orden)
  }
}
