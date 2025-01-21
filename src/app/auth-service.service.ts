import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Usuario } from './models/usuario';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn: boolean = false;
  private idUserName: string = '';
private username:string='';
  constructor(private http: HttpClient) { }


  private urlBase= 'http://localhost:8080/api/usuarios/';

  login(username: string, password: string): Observable<boolean> {
    const url = this.urlBase + 'login'; 
    const body = { nombreUsuario: username, contraseña: password };

    

    return this.http.post<any>(url, body).pipe(
      map(response => {
        console.log('Response:', response);
        if (response.login) { // Si el login fue exitoso
          this.loggedIn = true;
          this.idUserName = response.login.idUsuario;
          this.username=response.login.nombreUsuario;
          return true;
        }
        this.idUserName = "-1";
        return false;
      }),
      catchError(error => {
        console.error('Error en la autenticación:', error);
        this.idUserName = "-1";
        return [false]; 
      })
    );
  }

    register(nombreUsuario: string, passwd: string, email: string): Observable<any> {
    const body = { nombreUsuario, passwd, email };
    return this.http.post<any>(`${this.urlBase}registrar`, body);
  }

  
  logout() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getIdUserName(): string {
    return this.idUserName;
  }

  getUsername():string{
    return this.username;
  }

  getUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(this.urlBase + this.idUserName);
  }
}
