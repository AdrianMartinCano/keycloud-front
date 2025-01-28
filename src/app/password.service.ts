import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contrasena } from './models/contrasena';
import { UsuarioToken } from './models/UsuarioToken';

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
    return this.http.get<any>(url);
  }

usuarioPorEmail(email: string): Observable<any> {
  const url = 'http://localhost:8080/api/usuarios/email/'+email;
  return this.http.get<any>(url);
}

codigoRestauracion(codigo:string): Observable<any> {
  const url = 'http://localhost:8080/api/usuarios/codigo/'+codigo;
  return this.http.get<UsuarioToken>(url);
}



}
