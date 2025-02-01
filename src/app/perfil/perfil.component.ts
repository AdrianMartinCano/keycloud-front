import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Usuario } from '../models/usuario';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EncriptacionService } from '../encriptacion.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {} as Usuario;
  editandoPerfil: boolean = false;
  passwordActual:string = ''; 
  passwordNueva: string = ''; 
  constructor(public authservice: AuthServiceService, private snackBar: MatSnackBar, private encriptador: EncriptacionService) { }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    this.authservice.getUsuario().subscribe(
      (data: Usuario) => {
        this.usuario = data;
      },
      error => {
        console.error('Error al obtener el usuario:', error);
        this.snackBar.open('Error al cargar los datos del usuario. Inténtelo de nuevo más tarde', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

toggleEditarPerfil(): void {
  this.editandoPerfil = !this.editandoPerfil;

  if (!this.editandoPerfil) {
    this.manejadorActualizadorPassword();
  } else {
    this.resetearCamposPassword();
  }
}

private manejadorActualizadorPassword(): void {
  this.cargarDatosUsuario();

  if (!this.validarContrasenas()) {
    return;
  }

  if (this.sonIgualesPassword()) {
    this.actualizarPasswordUsuario();
  } else {
    this.mostrarMensajeContrasenasIncorrectas();
  }
}

private validarContrasenas(): boolean {
  if (!this.passwordActual || !this.passwordNueva) {
    this.snackBar.open('Debes introducir ambas contraseñas', 'Cerrar', {
      duration: 3000
    });
    return false;
  }
  return true;
}

private sonIgualesPassword(): boolean {
  return this.encriptador.encriptar(this.passwordActual) === this.usuario.passwd;
}

private actualizarPasswordUsuario(): void {
  this.usuario.passwd = this.passwordNueva;
  this.usuario.passwd = this.encriptador.encriptar(this.usuario.passwd);
  this.authservice.actualizarUsuario(this.usuario).subscribe(
    (data: Usuario) => {
      if (data && data.id > 0) {
        this.usuario = data;
        this.snackBar.open('Contraseña actualizada correctamente', 'Cerrar', {
          duration: 3000
        });
      }
    },
    error => {
      this.snackBar.open('Error al actualizar los datos del usuario', 'Cerrar', {
        duration: 3000
      });
    }
  );
}

private mostrarMensajeContrasenasIncorrectas(): void {
  this.snackBar.open('Contraseña actual incorrecta', 'Cerrar', {
    duration: 3000
  });
}

private resetearCamposPassword(): void {
  this.passwordActual = '';
  this.passwordNueva = '';
}



}