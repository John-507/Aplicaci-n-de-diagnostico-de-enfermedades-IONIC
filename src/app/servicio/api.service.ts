import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlDiagnostico = 'http://192.168.1.109:5000/diagnosticar';
  private urlSintomas = 'http://192.168.1.109:5000/sintomas';

  constructor(private http: HttpClient) { }

  diagnosticar(sintomas: string[]) {
    // Este método hace la petición HTTP POST al backend
    return this.http.post(this.urlDiagnostico, { sintomas });
  }

  obtenerSintomas() {
    return this.http.get<any[]>(this.urlSintomas);
  }

  
}
