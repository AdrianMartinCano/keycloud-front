import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn: boolean = false;
  private idUserName: string = '';

  constructor(private http: HttpClient) { }


  giveMePassword(idUserName: string): Observable<any[]> {
    const url = 'http://localhost:8080/api/contrasenas/' + idUserName;
    return this.http.get<any[]>(url);
  }

  login(username: string, password: string): Observable<boolean> {
    const url = 'http://localhost:8080/api/usuarios/login'; 
    const body = { nombreUsuario: username, contraseña: password };

    

    return this.http.post<any>(url, body).pipe(
      map(response => {
        console.log('Response:', response);
        if (response.login) { // Si el login fue exitoso
          this.loggedIn = true;
          this.idUserName = response.login.idUsuario;
          return true;
        }
        this.idUserName = "-1";
        return false;
      }),
      catchError(error => {
        console.error('Error en la autenticación:', error);
        this.idUserName = "-1";
        return [false]; // Devuelve un valor observable por defecto en caso de error
      })
    );
  }

  register(username: string, password: string, email: string): Observable<boolean> {
    const url = 'http://localhost:8080/api/usuarios'; // Incluye el protocolo http://
    const body = { nombreUsuario: username, passwd: password, email: email };
  
   
  
    return this.http.post<any>(url, body).pipe(
      map(response => {
        console.log('Response:', response);
        // Verifica si la respuesta es válida
        if (response.id !== undefined && response.id !== -1) {
          this.loggedIn = true;
          return true;
        }
       
        return false;
      }),
      catchError(error => {
        return of(false); // Usa `of` para emitir un valor observable válido
      })
    );
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
}
