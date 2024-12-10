import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private loggedIn: boolean = false;
  constructor() { }
  login(username: string, password: string): boolean {
    // Aquí puedes agregar la lógica de autenticación real
    if (username === '1234' && password === '1234') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }
  logout() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
}
