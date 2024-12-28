import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

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
  username: string = '';

  password: string = '';
  isLoginActive = true;

  @ViewChild('usernameInput') usernameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;
  @ViewChild('userNameRegister') userNameRegister!: ElementRef;
  @ViewChild('emailRegister') emailRegister!: ElementRef;
  @ViewChild('passwordRegister') passwordRegister!: ElementRef;
  @ViewChild('passwordRepeatRegister') passwordRepeatRegister!: ElementRef;


  @ViewChild('error') error!: ElementRef;
  constructor(private authService: AuthServiceService, private router: Router) { }

  toggleForm() {
    this.isLoginActive = !this.isLoginActive;
    console.log( this.isLoginActive)
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
    if(this.isLoginActive)
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/listaContrasenas']);
    } else {
      this.usernameInput.nativeElement.value = '';
      this.passwordInput.nativeElement.value = '';
     
      alert('Credenciales incorrectas');
   

    }
  }

  register() {
    //alert('Usuario registrado con éxito');
    if(this.passwordRegister.nativeElement.value != this.passwordRepeatRegister.nativeElement.value){
      alert('Las contraseñas no coinciden');
      return;
    }
    alert("Usuario: " + this.usernameInput.nativeElement.value + " Email: " + this.usernameInput.nativeElement.value + " Password: " + this.passwordRegister.nativeElement.value + " Password Repeat: " + this.passwordRepeatRegister.nativeElement.value);
    this.isLoginActive = true; // Cambia a modo login después del registro
  /*  if (this.authService.register(this.username, this.password)) {
      alert('Usuario registrado con éxito');
      this.isLoginActive = true; // Cambia a modo login después del registro
    } else {
      alert('Error al registrar el usuario');
    }*/
  }


} 