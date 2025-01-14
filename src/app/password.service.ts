import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrasena } from './models/contrasena';

@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private idUser: string = '';
   constructor(private http: HttpClient) { }




   setIdUser(idUser: string){
      this.idUser = idUser;
    }

      giveMePassword(idUserName: string): Observable<Contrasena[]> {
   const url = 'http://localhost:8080/api/contrasenas/' + idUserName;
   
    
    return this.http.get<any[]>(url);
  }

  agregarPassword(contrasena: Contrasena): Observable<Contrasena> {
    const url = 'http://localhost:8080/api/contrasenas/crear';
    return this.http.post<any>(url, contrasena);
  }

  editarPassword(contrasena:Contrasena): Observable<Contrasena> {
    const url = 'http://localhost:8080/api/contrasenas/modificar';
    return this.http.post<any>(url, contrasena);
  }

  borrarPassword(id:number): Observable<Contrasena> {
    const url = 'http://localhost:8080/api/contrasenas/eliminar/' + id;
    console.log(url);
    return this.http.get<any>(url);
  }

}
