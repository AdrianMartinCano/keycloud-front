import { Component } from '@angular/core';
import { ContactoForm } from '../models/ContactoForm';
import { ContactoService } from '../contacto.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})

export class ContactoComponent {

  constructor(private contactoService: ContactoService,  private snackBar: MatSnackBar) { }
  contacto: ContactoForm = {
    email: '',
    nombre: '',
    asunto: '',
    mensaje: ''
  };

  emailValido: boolean = true; 
  estaCargando : boolean = false;
  onEmailBlur() {
    this.emailValido = this.validarEmail(this.contacto.email);
    if (!this.emailValido) {
      console.log('El email no es válido');
    }
  }

  validarEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  }

  enviarMensaje() {
    this.estaCargando = true;
    this.contactoService.enviarFormularioContacto(this.contacto).subscribe(
      data => {
        this.estaCargando = false;
        if(data)
          this.snackBar.open('Mensaje enviado. Te responderé lo antes posible. Gracias!', 'Cerrar', { duration: 10000 });
        this.limpiarFormulario();
      },
      error => {
         this.estaCargando = false;
        console.error('Error al enviar el formulario');
      }
    );
    
    
  }

  limpiarFormulario() {
    this.contacto = {
      email: '',
      nombre: '',
      asunto: '',
      mensaje: ''
    };
  }
}