import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css'],
  animations: [
    trigger('slidePanel', [
      state('login', style({
        transform: 'translateX(0%)'
      })),
      state('register', style({
        transform: 'translateX(100%)'
      })),
      transition('login <=> register', animate('600ms ease-in-out'))
    ])
  ]
})
export class InicioSesionComponent {
  
  loginData = {
    nombreUsuario: '',
    passwd: ''
  };

  registerData = {
    nombreUsuario: '',
    email: '',
    passwd: '',
    confirmPasswd: ''
  };

  isLoginActive = true;

  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }


  toggleForm() {
    this.isLoginActive = !this.isLoginActive;
   
    this.loginData = {
      nombreUsuario: '',
      passwd: ''
    };
    this.registerData = {
      nombreUsuario: '',
      email: '',
      passwd: '',
      confirmPasswd: ''
    };
    
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.isLoginActive) {
      this.login();
    } else {
      this.register();
    }
  }

  login() {
    this.authService.login(this.loginData.nombreUsuario, this.loginData.passwd).subscribe(
      success => {
        if (success) {
          this.router.navigate(['/listaContrasenas']);
        } else {
          this.mostrarError('Credenciales incorrectas');
        }
      },
      error => {
        
        this.mostrarError('Error en el servidor, intenta nuevamente más tarde.');
      }
    );
  }

  mostrarError(mensaje: string) {
    
    this.loginData = {
      nombreUsuario: '',
      passwd: ''
    };
    this.snackBar.open(mensaje, 'Cerrar', { duration: 2000 });
    
  }

  register() {
    if (this.registerData.passwd != this.registerData.confirmPasswd) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 2000 });
      return;
    }
    this.authService.register(this.registerData.nombreUsuario, this.registerData.passwd, this.registerData.email).subscribe(
      response => {
        console.log(this.registerData.nombreUsuario, this.registerData.passwd, this.registerData.email);  
        if (response && response.id) {
          this.snackBar.open('Usuario registrado con éxito', 'Cerrar', { duration: 2000 });
        } else {
          this.mostrarError('Ha habido algún problema al registrar el usuario');
        }
      },
      error => {
        this.mostrarError('Error en el servidor, intenta nuevamente más tarde.');
      }
    );

    this.isLoginActive = true; 

  }
}