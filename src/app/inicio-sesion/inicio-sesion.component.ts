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
   emailValido: boolean = true;
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

  validarEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  onEmailBlur() {
    this.emailValido = this.validarEmail(this.registerData.email);
    if (!this.emailValido) {
      this.snackBar.open('Por favor, introduce un email válido', 'Cerrar', { duration: 3000 });
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
    this.snackBar.open(mensaje, 'Cerrar', { duration: 3000 });
    
  }

  register() {
    if (this.registerData.passwd != this.registerData.confirmPasswd) {
      this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 2000 });
      return;
    }
    if(!this.validarEmail(this.registerData.email)){
      this.snackBar.open('El correo no tiene un formato correcto', 'Cerrar', { duration: 2000 });
      this.emailValido = false;
      return;
    }

    
    this.authService.register(this.registerData.nombreUsuario, this.registerData.passwd, this.registerData.email).subscribe(
       data => {
        console.log(data);
        if (data && data.usuario && data.usuario.nombreUsuario!=null) {
          this.snackBar.open('Usuario registrado con éxito', 'Cerrar', { duration: 2000 });
           this.isLoginActive = true;
          return;
        }
        
        if (data.error && data.error.descripcion && data.error.codigo) {
          this.mostrarError(data.error.descripcion);
          return;
        }
      },
      error => {
        this.mostrarError('Error en el servidor, intenta nuevamente más tarde.');
      }
    );

 

  }
}