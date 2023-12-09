import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url = 'http://localhost:5000/diagnosticar';

  constructor(private http: HttpClient) { }

  diagnosticar(sintomas: string[]) {
    // Este método hace la petición HTTP POST al backend
    return this.http.post(this.url, { sintomas });
  }
}
