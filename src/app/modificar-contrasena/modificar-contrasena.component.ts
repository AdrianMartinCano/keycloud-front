import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modificar-contrasena',
  templateUrl: './modificar-contrasena.component.html',
  styleUrls: ['./modificar-contrasena.component.css']
})
export class ModificarContrasenaComponent {
  constructor(
    public dialogRef: MatDialogRef<ModificarContrasenaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { sitio: string, usuario: string, contrasena: string }
  ) {}

  onSubmit(): void {
    this.dialogRef.close(this.data);
  }
}