import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarjeta } from '../models/tarjeta';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {
  private apiUrl = 'https://backend-pollada.onrender.com/tarjetas';

  constructor(private http: HttpClient) { }

  getTarjetas(): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(this.apiUrl);
  }

  updateTarjeta(id: number, tarjeta: Tarjeta): Observable<Tarjeta> {
    const url = `${this.apiUrl}/${id}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<Tarjeta>(url, tarjeta, { headers });
  }
}
