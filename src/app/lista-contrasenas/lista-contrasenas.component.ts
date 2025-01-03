import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../auth-service.service';
import { EncriptacionService } from '../encriptacion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarActionComponent } from '../snackbar-action/snackbar-action.component';

@Component({
  selector: 'app-lista-contrasenas',
  templateUrl: './lista-contrasenas.component.html',
  styleUrls: ['./lista-contrasenas.component.css']
})
export class ListaContrasenasComponent implements OnInit {
  idUserName: string='';
  contrasenas: { 
    id: number, 
    sitio: string, 
    usuario: string, 
    contrasena: string,
    caducidad: Date
  }[] = [];
  
  showModal = false;
  passwordForm: FormGroup;

  constructor(
    private authService: AuthServiceService,
    public encriptador: EncriptacionService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {
    this.passwordForm = this.fb.group({
      sitio: ['', Validators.required],
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.idUserName = this.authService.getIdUserName();
    this.authService.giveMePassword(this.idUserName).subscribe(passwords => {
      this.contrasenas = passwords.map(password => {
        const fechaCreacion = new Date(password.fecha_creacion);
        const fechaSinHora = new Date(fechaCreacion.getFullYear(), fechaCreacion.getMonth(), fechaCreacion.getDate());
        return {
          id: password.id,
          sitio: password.titulo,
          usuario: password.nombre_usuario,
          contrasena: this.encriptador.encriptar(password.contrasena),
          caducidad: fechaSinHora
        };
      });
    });
  }

  editarContrasena(id: number): void {
    const contrasena = this.contrasenas.find(c => c.id === id);
    if (contrasena) {
      this.passwordForm.setValue({
        sitio: contrasena.sitio,
        usuario: contrasena.usuario,
        contrasena: contrasena.contrasena
      });
      this.showModal = true;
    }
  }

  agregarContrasena(): void {
    if (this.passwordForm.valid) {
      const nuevaContrasena = {
        id: this.contrasenas.length + 1,
        sitio: this.passwordForm.value.sitio,
        usuario: this.passwordForm.value.usuario,
        contrasena: this.encriptador.encriptar(this.passwordForm.value.contrasena),
       caducidad: new Date('2022-12-31')
      };
      
      this.contrasenas.push(nuevaContrasena);
      this.showModal = false;
      this.passwordForm.reset();
      this.snackBar.open('Contraseña agregada', 'Cerrar', { duration: 2000 });
    }
  }

  eliminarContrasena(id: number): void {
    const snackBarRef = this.snackBar.openFromComponent(SnackbarActionComponent, {
      duration: 10000,
    });

    snackBarRef.onAction().subscribe(() => {
      this.contrasenas = this.contrasenas.filter(c => c.id !== id);
      this.snackBar.open('Contraseña eliminada', 'Cerrar', { duration: 2000 });
    });
  }
}