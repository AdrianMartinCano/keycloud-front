import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Usuario } from '../models/usuario';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  idUsuario: string = '';
  usuario: Usuario = {} as Usuario;
  usuarioEditado: Usuario = {} as Usuario;
  editandoPerfil: boolean = false;
  passwordNueva:string='';
  constructor(
    public authservice: AuthServiceService,
    private snackBar: MatSnackBar
  ) { }

 ngOnInit(): void {
    this.authservice.getUsuario().subscribe(
      (data: Usuario) => {
        this.usuario = data;
        this.usuarioEditado = { ...data }; // Inicializa la variable temporal con los datos actuales
      },
      error => {
        console.error('Error al obtener el usuario:', error);
        this.snackBar.open('Error al cargar los datos del usuario', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }

  cargarDatosUsuario() {
    this.authservice.getUsuario().subscribe(
      (data: Usuario) => {
        this.usuario = data;
        this.usuarioEditado = { ...data }; 
      },
      error => {
        console.error('Error al obtener el usuario:', error);
        this.snackBar.open('Error al cargar los datos del usuario', 'Cerrar', {
          duration: 3000
        });
      }
    );
  }





  cambiarContrasena() {
    // Aquí implementarías la lógica para cambiar la contraseña
   
    console.log('Cambiar contraseña');
  }


  

  
  toggleEditarPerfil(): void {
    this.editandoPerfil = !this.editandoPerfil;
    if (!this.editandoPerfil) {
      // Si se desactiva el modo de edición, actualiza los datos originales
      this.usuario = { ...this.usuarioEditado };
      console.log("prueba password vieja");
      console.log("hola"  + this.authservice.getUsuarioObject().passwd);
      if(this.authservice.getUsuarioObject().passwd!=this.usuario.passwd){
       console.log("la contraseña antigua es distinta");
      }
      // if (this.passwordNueva) {
        
      //   this.usuario.passwd = this.passwordNueva;
      //   this.passwordNueva = '';
      //   this.snackBar.open('Perfil actualizado', 'Cerrar', {
      //     duration: 3000
      //   });
      // }
    }
  }

}