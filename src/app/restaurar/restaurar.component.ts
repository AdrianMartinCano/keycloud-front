import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PasswordService } from '../password.service';
import { UsuarioToken } from '../models/UsuarioToken';
import { EncriptacionService } from '../encriptacion.service';
@Component({
  selector: 'app-restaurar',
  templateUrl: './restaurar.component.html',
  styleUrls: ['./restaurar.component.css'],
})
export class RestaurarComponent {
  email: string = '';
  codigo: string = '';
  nuevaPassword: string = '';
  confirmPassword: string = '';
  valorToken: string = '';
  etapaRestauracion: 'email' | 'codigo' | 'password' | 'completado' = 'email';
  isLoading: boolean = false;
  usuarioAux: UsuarioToken = {
    id: 0,
    nombre: '',
    email: '',
    resetTokens: {
      id: 0,
      token: '',
      fechaCreacion: '',
      fechaExpiracion: '',
    },
    errorResponse: {
      codigo: 0,
      descripcion: '',
    },
  };
  constructor(
    private passwordService: PasswordService,
    private snackBar: MatSnackBar,
    private router: Router,
    private encriptacion: EncriptacionService
  ) {}

  volverInicio() {
    this.router.navigate(['/inicio']);
  }

  enviarEmail() {
    if (!this.email) {
      this.snackBar.open('Por favor, introduce un email', 'Cerrar', {
        duration: 3000,
      });
      return;
    }
    if (!this.validarEmail(this.email)) {
      this.snackBar.open('Por favor, introduce un email válido', 'Cerrar', {
        duration: 3000,
      });
      return;
    }
    this.isLoading = true;
    this.passwordService.usuarioPorEmail(this.email).subscribe(
      (data: UsuarioToken) => {
        this.isLoading = false;
        if (data.errorResponse && data.errorResponse.codigo != 0) {
          this.snackBar.open('El email introducido no está en la base de datos','Cerrar',
            { duration: 3000 }
          );
        } else if (data) {
          this.usuarioAux = {...data};
          this.valorToken = data.resetTokens.token;
          this.etapaRestauracion = 'codigo';
          this.snackBar.open('Se ha enviado un código por email, debes introducirlo.','Cerrar',
            { duration: 3000 }
          );
        } else {
          this.snackBar.open(
            'El correo ingresado no está registrado',
            'Cerrar',
            { duration: 3000 }
          );
        }
      },
      (error) => {
        this.isLoading = false;
        this.snackBar.open(
          'Error al procesar la solicitud. Inténtalo más tarde',
          'Cerrar',
          { duration: 3000 }
        );
      }
    );
  
  }

  verificarCodigo() {
     
    if (this.codigo == this.valorToken) {
      this.etapaRestauracion = 'password';
      return;
    }
    this.snackBar.open('El código introducido no es correcto', 'Cerrar', {
      duration: 3000,
    });
  }

restaurarPassword() {
  if (this.nuevaPassword === this.confirmPassword && this.nuevaPassword.trim().length > 0) {
    this.isLoading = true;
    this.usuarioAux.passwd = this.nuevaPassword;
    this.usuarioAux.passwd = this.encriptacion.encriptar(this.usuarioAux.passwd);
    this.passwordService.nuevaPassword(this.usuarioAux).subscribe(
      (data: UsuarioToken) => {
        this.isLoading = false;
        if (data && data.errorResponse == null && data.nombre === this.usuarioAux.nombre) {
          this.snackBar.open('Contraseña restaurada correctamente', 'Cerrar', {
            duration: 3000,
          });
          this.etapaRestauracion = 'completado';
          return;
        } else if (data.errorResponse && data.errorResponse.descripcion) {
          this.snackBar.open(data.errorResponse.descripcion, 'Cerrar', {
            duration: 3000,
          });
        } else {
          this.snackBar.open('Error desconocido al restaurar la contraseña', 'Cerrar', {
            duration: 3000,
          });
        }
      },
      error => {
        this.isLoading = false;
        this.snackBar.open('Error al procesar la solicitud. Inténtalo más tarde', 'Cerrar', { duration: 3000 });
      }
    );
  } else {
    this.snackBar.open('Las contraseñas no coinciden o están vacías', 'Cerrar', { duration: 3000 });
  }
}

  validarEmail(email: string): boolean {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }
}
