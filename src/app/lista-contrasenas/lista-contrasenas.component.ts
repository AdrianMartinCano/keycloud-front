import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from '../auth-service.service';
import { ModificarContrasenaComponent } from '../modificar-contrasena/modificar-contrasena.component';
import { EncriptacionService } from '../encriptacion.service';
@Component({
  selector: 'app-lista-contrasenas',
  templateUrl: './lista-contrasenas.component.html',
  styleUrls: ['./lista-contrasenas.component.css']
})
export class ListaContrasenasComponent implements OnInit {
  idUserName: string = '';
  contrasenas: { sitio: string, usuario: string, contrasena: string, visible?: boolean }[] = [];

  constructor(
    private authService: AuthServiceService,
    public dialog: MatDialog,
    public encriptador: EncriptacionService
  ) { }

  ngOnInit(): void {
    this.idUserName = this.authService.getIdUserName();
    // Simulación de datos de contraseñas cifradas
    this.contrasenas = [
      { sitio: 'Google', usuario: 'user1', contrasena: this.encriptador.encriptar('pass1') },
      { sitio: 'Facebook', usuario: 'user2', contrasena: this.encriptador.encriptar('pass2') },
      { sitio: 'Twitter', usuario: 'user3', contrasena: this.encriptador.encriptar('pass3') }
    ];
  }

  modificar(contrasena: { sitio: string, usuario: string, contrasena: string }): void {
    const decryptedPassword = this.encriptador.desencriptar(contrasena.contrasena);
    const dialogRef = this.dialog.open(ModificarContrasenaComponent, {
      width: '250px',
      data: { ...contrasena, contrasena: decryptedPassword }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.contrasenas.findIndex(c => c.sitio === contrasena.sitio && c.usuario === contrasena.usuario);
        if (index !== -1) {
          this.contrasenas[index] = { ...result, contrasena: this.encriptador.encriptar(result.contrasena) };
        }
      }
    });
  }

  borrar(contrasena: { sitio: string, usuario: string, contrasena: string }): void {
    this.contrasenas = this.contrasenas.filter(c => c !== contrasena);
  }

  mostrarContrasena(contrasena: { sitio: string, usuario: string, contrasena: string, visible?: boolean }): void {
    contrasena.visible = !contrasena.visible;
  }

  obtenerContrasena(contrasena: { sitio: string, usuario: string, contrasena: string, visible?: boolean }): string {
    return contrasena.visible ? this.encriptador.desencriptar(contrasena.contrasena) : '****';
  }
}