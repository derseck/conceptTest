import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Productos } from '../interfaces/productos';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  getProductos(): Observable<Productos[]> {
    return this.http.get<Productos[]>('http://localhost:8000/producto?format=json')
  }

  getProducto(id: number): Observable<Productos> {
    return this.http.get<Productos>('http://localhost:8000/producto/'+id)
  }

  delete(id: number): Observable<Productos[]> {
    return this.http.delete<Productos[]>('http://localhost:8000/producto/'+id)
  }

  insert(producto: Productos): Observable<Productos[]> {
    return this.http.post<Productos[]>('http://localhost:8000/producto', producto)
  }

  update(id: number, producto: Productos) {
    return this.http.put('http://localhost:8000/producto/'+id, producto)
  }

}
