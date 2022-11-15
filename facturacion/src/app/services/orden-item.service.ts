import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrdenItem } from '../interfaces/ordenItem';

@Injectable({
  providedIn: 'root'
})
export class OrdenItemService {

  constructor(private http: HttpClient) { }

  getOrdenItem(): Observable<OrdenItem[]> {
    return this.http.get<OrdenItem[]>('http://localhost:8000/ordenItem')
  }

  getOrdenItemById(id: number): Observable<OrdenItem> {
    return this.http.get<OrdenItem>('http://localhost:8000/ordenItem/'+id)
  }

  getOrdenItemByOrden(id: number): Observable<OrdenItem[]> {
    return this.http.get<OrdenItem[]>('http://localhost:8000/ordenItem/orden/'+id)
  }

  delete(id: number) {
    return this.http.delete('http://localhost:8000/ordenItem/'+id)
  }

  insert(ordenItem: OrdenItem): Observable<OrdenItem[]> {
    return this.http.post<OrdenItem[]>('http://localhost:8000/ordenItem', ordenItem)
  }

  update(id: number, ordenItem: OrdenItem) {
    return this.http.put('http://localhost:8000/ordenItem/'+id, ordenItem)
  }
}
