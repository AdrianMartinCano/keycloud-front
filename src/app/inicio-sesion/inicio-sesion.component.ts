import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';


@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  username: string = '';
  password: string = '';
  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  constructor(private authService: AuthServiceService, private router: Router) { }

  onLogin() {
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/listaContrasenas']);
    } else {
      this.usernameInput.nativeElement.value = '';
      this.passwordInput.nativeElement.value = '';
      alert('Credenciales incorrectas');

    }
  }
}
