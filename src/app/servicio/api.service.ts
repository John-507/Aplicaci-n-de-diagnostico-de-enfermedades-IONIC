import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private urlDiagnostico = 'https://7c7c-190-218-34-61.ngrok-free.app/diagnosticar';
  private urlSintomas = 'https://7c7c-190-218-34-61.ngrok-free.app/sintomas';

  constructor(private http: HttpClient) { }

  diagnosticar(sintomas: string[]) {

    const httpOptions = {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true' 
      })
    };
    // Este método hace la petición HTTP POST al backend
    return this.http.post(this.urlDiagnostico, { sintomas },httpOptions);
  }

  obtenerSintomas() {

    const httpOptions = {
      headers: new HttpHeaders({
        'ngrok-skip-browser-warning': 'true' 
      })
    };
    return this.http.get<any[]>(this.urlSintomas,httpOptions);
  }

  
}
