import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn: boolean = false;
  private idUserName: string = '';
  constructor() { }
  login(username: string, password: string): boolean {
    // Aquí puedes agregar la lógica de autenticación real, es decir, la consulta a la api
    if (username === '1234' && password === '1234') {
      this.loggedIn = true;
      this.idUserName = "aaaa";
      return true;
    }
    this.idUserName = "-1";
    return false;
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
