import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactoForm } from './models/ContactoForm';
@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(private http: HttpClient) { 
  }


    enviarFormularioContacto(contacto: ContactoForm): Observable<ContactoForm[]> {
     const url = 'http://localhost:8080/api/contacto/guardar';
    return this.http.post<any>(url, contacto);
    }
}
