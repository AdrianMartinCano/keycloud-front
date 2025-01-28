import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PasswordService } from '../password.service';
import { UsuarioToken } from '../models/UsuarioToken';

@Component({
  selector: 'app-restaurar',
  templateUrl: './restaurar.component.html',
  styleUrls: ['./restaurar.component.css']
})
export class RestaurarComponent {
  email: string = '';
  codigo: string = '';
  nuevaPassword: string = '';
  confirmPassword: string = '';
  valorToken:string='';

  etapaRestauracion: 'email' | 'codigo' | 'password' | 'completado' = 'email';

  constructor(
    private authService: AuthServiceService, 
    private passwordService: PasswordService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}


  volverInicio() {
  this.router.navigate(['/inicio']);
}

  enviarEmail() {
    if (!this.email) {
      this.snackBar.open('Por favor, introduce un email', 'Cerrar', { duration: 3000 });
      return;
    }
        if (!this.validarEmail(this.email)) {
      this.snackBar.open('Por favor, introduce un email válido', 'Cerrar', { duration: 3000 });
         return;
    }

  this.passwordService.usuarioPorEmail(this.email).subscribe(
      (data: UsuarioToken) => {
        
        if (data.errorResponse && data.errorResponse.codigo!=0) {
          
          this.snackBar.open("El email introducido no está en la base de datos", 'Cerrar', { duration: 3000 });
        } else if (data) {
        
          this.valorToken = data.resetTokens.token;
          console.log(this.valorToken);
          this.etapaRestauracion = 'codigo';
          this.snackBar.open('Se ha enviado un código por email, debes introducirlo.', 'Cerrar', { duration: 3000 });
        } else {
          this.snackBar.open('El correo ingresado no está registrado', 'Cerrar', { duration: 3000 });
        }
      },
      error => {
        
        this.snackBar.open('Error al procesar la solicitud. Inténtalo más tarde', 'Cerrar', { duration: 3000 });
      }
    );

  }

   verificarCodigo() {
    if(this.codigo === this.valorToken){
    this.etapaRestauracion = 'password';
      return
  }
    this.snackBar.open('El código introducido no es correcto', 'Cerrar', { duration: 3000 });
    
   }

  restaurarPassword() {
this.etapaRestauracion = 'completado';
    this.snackBar.open('Contraseña restaurada correctamente', 'Cerrar', { duration: 3000 });
     if (this.nuevaPassword !== this.confirmPassword) {
       this.snackBar.open('Las contraseñas no coinciden', 'Cerrar', { duration: 3000 });
     this.etapaRestauracion = 'password';
     }

  }


   validarEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }
}