import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthServiceService } from '../auth-service.service';
import { EncriptacionService } from '../encriptacion.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarActionComponent } from '../snackbar-action/snackbar-action.component';
import { PasswordService } from '../password.service';
import { Contrasena } from '../models/contrasena';
@Component({
  selector: 'app-lista-contrasenas',
  templateUrl: './lista-contrasenas.component.html',
  styleUrls: ['./lista-contrasenas.component.css']
})
export class ListaContrasenasComponent implements OnInit {
  idUserName: string = '';
 contrasenas:Contrasena[]= [];
  contrasenasMostrar: Contrasena[] = [];
  mostrarModal = false;
  modoEditar = false;
  actualIdEditar: number | undefined = undefined;
  visibilidadContrasenas: { [key: number]: boolean } = {};
  passwordForm: FormGroup;
  passwordStrength: number = 0;
 searchTerm: string = '';
  contrasenasFiltradas: Contrasena[] = [];
  constructor(
    private authService: AuthServiceService,
    public encriptador: EncriptacionService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private passwordService:PasswordService
  ) {
    this.passwordForm = this.fb.group({
      idusuario: [''], 
      titulo: [''],
      nombre_usuario: [''],
      contrasena: [''],
      url: [''],
      notas: [''],
      longitud: [16],
      incluirMayusculas: [true],
      incluirMinusculas: [true],
      incluirNumeros: [true],
      incluirSimbolos: [false]
    });

    this.passwordForm.get('contrasena')?.valueChanges.subscribe(value => {
      this.calcularFortaleza(value);
    });
  }

ngOnInit(): void {
  this.idUserName = this.authService.getIdUserName();
  console.log(this.idUserName);
  this.passwordService.giveMePassword(this.idUserName).subscribe(passwords => {
    // Guardamos en ambos arrays
    this.contrasenas = passwords.map(password => {
      return {
        id: password.id,
        idusuario: password.idusuario,
        titulo: password.titulo,
        nombre_usuario: password.nombre_usuario,
        contrasena: password.contrasena,
        url: password.url,
        notas: password.notas,
        fecha_caducidad: password.fecha_caducidad ? new Date(password.fecha_caducidad).toISOString() : undefined
      };
    });
    // Hacemos una copia para mostrar
    this.contrasenasMostrar = [...this.contrasenas];
  });
}
onSearch(event: any): void {
  const searchValue = event.target.value.toLowerCase().trim();
  
  if (!searchValue) {
    // Si está vacío, mostramos todas
    this.contrasenasMostrar = [...this.contrasenas];
    return;
  }

  // Filtramos sobre el array original
  this.contrasenasMostrar = this.contrasenas.filter(contrasena => {
    return (
      (contrasena.titulo?.toLowerCase().includes(searchValue)) ||
      (contrasena.nombre_usuario?.toLowerCase().includes(searchValue)) ||
      (contrasena.url?.toLowerCase().includes(searchValue))
    );
  });
}

  calcularFortaleza(password: string): void {
    let puntos = 0;
    if (!password) {
      this.passwordStrength = 0;
      return;
    }

    // Longitud
    puntos += password.length * 4;

    // Variedad de caracteres
    if (/[A-Z]/.test(password)) puntos += 15;
    if (/[a-z]/.test(password)) puntos += 15;
    if (/[0-9]/.test(password)) puntos += 15;
    if (/[^A-Za-z0-9]/.test(password)) puntos += 25;

    // Normalizar a 100
    this.passwordStrength = Math.min(100, puntos);
  }

  getFortalezaClase(): string {
    if (this.passwordStrength < 40) return 'weak';
    if (this.passwordStrength < 70) return 'medium';
    return 'strong';
  }

  getFortalezaTexto(): string {
    if (this.passwordStrength < 40) return 'Débil';
    if (this.passwordStrength < 70) return 'Media';
    return 'Fuerte';
  }

  generarContrasena(): void {
    const longitud = this.passwordForm.get('longitud')?.value || 16;
    const mayusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const minusculas = 'abcdefghijklmnopqrstuvwxyz';
    const numeros = '0123456789';
    const simbolos = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let caracteres = '';
    if (this.passwordForm.get('incluirMayusculas')?.value) caracteres += mayusculas;
    if (this.passwordForm.get('incluirMinusculas')?.value) caracteres += minusculas;
    if (this.passwordForm.get('incluirNumeros')?.value) caracteres += numeros;
    if (this.passwordForm.get('incluirSimbolos')?.value) caracteres += simbolos;

    if (!caracteres) {
      caracteres = minusculas + numeros; 
    }

    let password = '';
    for (let i = 0; i < longitud; i++) {
      const randomIndex = Math.floor(Math.random() * caracteres.length);
      password += caracteres[randomIndex];
    }

    this.passwordForm.patchValue({ contrasena: password });
  }

editarContrasena(id: number): void {
  
  const contrasena = this.contrasenasMostrar.find(c => c.id == id);
  if (contrasena) {
    this.passwordForm.patchValue({
      titulo: contrasena.titulo,
      nombre_usuario: contrasena.nombre_usuario,
      contrasena: contrasena.contrasena,
      url: contrasena.url,
      notas: contrasena.notas
    });
    this.mostrarModal = true; 
    this.modoEditar = true;
    this.actualIdEditar = id;
  } else {
    console.error('No se encontró la contraseña con el ID:', id);
  }
}


  mostrarContrasena(id: number): void {
    this.snackBar.open('Contraseña visible durante 15 segundos', 'Cerrar', { duration: 15000 });
    this.visibilidadContrasenas[id] = !this.visibilidadContrasenas[id];
    
    if (this.visibilidadContrasenas[id]) {
      setTimeout(() => {
        this.visibilidadContrasenas[id] = false;
      }, 15000);
    }
  }

agregarContrasena(): void {
  if (this.passwordForm.valid) {
    const nuevaContrasena: Partial<Contrasena> = {
      idusuario: this.idUserName,
      titulo: this.passwordForm.value.titulo,
      nombre_usuario: this.passwordForm.value.nombre_usuario,
      contrasena: this.passwordForm.value.contrasena,
      url: this.passwordForm.value.url,
      notas: this.passwordForm.value.notas,
      fecha_caducidad: new Date().toISOString() 
    };

    if (this.modoEditar) {
      
      const index = this.contrasenasMostrar.findIndex(c => c.id == this.actualIdEditar);
      if (index != -1) {
        nuevaContrasena.id = this.actualIdEditar;
       
        this.passwordService.editarPassword(nuevaContrasena as Contrasena).subscribe(
          (response) => {
            
            this.contrasenas[index] = response;
            this.contrasenasMostrar[index] = response;
            //Si cuando hemos editado o añadido, miramos si hay un término de búsqueda
            //Si lo hay, volvemos a buscar con el término actual
            if(this.searchTerm){
              this.onSearch({target: {value: this.searchTerm}});
            }

            this.snackBar.open('Contraseña editada correctamente', 'Cerrar', { duration: 5000 });
          },
          (error) => {
            console.error('Error al editar la contraseña:', error);
          }
        );
      }
    } else {
      this.passwordService.agregarPassword(nuevaContrasena as Contrasena).subscribe(
        (response) => {
          
          this.contrasenas.push(response);
          this.contrasenasMostrar.push(response);
          this.snackBar.open('Contraseña añadida correctamente', 'Cerrar', { duration: 5000 });
        },
        (error) => {
          console.error('Error al agregar la contraseña:', error);
        }
      );
    }

    this.mostrarModal = false;
    this.passwordForm.reset({
      longitud: 16,
      incluirMayusculas: true,
      incluirMinusculas: true,
      incluirNumeros: true,
      incluirSimbolos: false
    });
    this.modoEditar = false;
    this.actualIdEditar = undefined;
  }
}

  async copiarAlPortapapeles(texto: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(texto);
      this.snackBar.open('Contraseña copiada al portapapeles durante 30 segundos', 'Cerrar', { duration: 30000 });

      setTimeout(async () => {
        try {
          await navigator.clipboard.writeText("");
          this.snackBar.open('Portapapeles vaciado', 'Cerrar', { duration: 3000 });
        } catch (err) {
          console.error('Error al vaciar el portapapeles: ', err);
        }
      }, 30000);

    } catch (err) {
      this.snackBar.open('Error al copiar la contraseña', 'Cerrar', { duration: 3000 });
    }
  }

eliminarContrasena(id: number): void {
  const snackBarRef = this.snackBar.openFromComponent(SnackbarActionComponent, {
    duration: 10000,
  });

  snackBarRef.onAction().subscribe(() => {
    this.passwordService.borrarPassword(id).subscribe(
      () => {
        
        this.contrasenas = this.contrasenas.filter(c => c.id !== id);
        this.contrasenasMostrar = this.contrasenasMostrar.filter(c => c.id !== id);
        this.snackBar.open('Contraseña eliminada', 'Cerrar', { duration: 2000 });
      },
      (error) => {
        console.error('Error al eliminar la contraseña:', error);
        this.snackBar.open('Error al eliminar la contraseña', 'Cerrar', { duration: 2000 });
      }
    );
  });
}
estaProximaACaducar(fecha_caducidad: string | undefined): boolean {
  if (!fecha_caducidad) {
    console.log('No hay fecha de caducidad');
    return false;
  }
  
  const fechaCaducidad = new Date(fecha_caducidad);
  const ahora = new Date();
  
  // Agregamos logs para debug
  console.log('Fecha de caducidad:', fechaCaducidad);
  console.log('Fecha actual:', ahora);
  
  const diferenciaDias = Math.floor(
    (fechaCaducidad.getTime() - ahora.getTime()) / (1000 * 60 * 60 * 24)
  );
  
  console.log('Diferencia en días:', diferenciaDias);
  const estaProxima = diferenciaDias <= 7;
  console.log('¿Está próxima a caducar?:', estaProxima);
  
  return estaProxima;
}


}