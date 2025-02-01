import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ListaContrasenasComponent } from './lista-contrasenas/lista-contrasenas.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { SobreProyectoComponent } from './sobre-proyecto/sobre-proyecto.component';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { SnackbarActionComponent } from './snackbar-action/snackbar-action.component';
import { FooterComponent } from './footer/footer.component';
import { MatSliderModule } from '@angular/material/slider';
import { PerfilComponent } from './perfil/perfil.component';
import {MatToolbarModule, } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RestaurarComponent } from './restaurar/restaurar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ContactoComponent } from './contacto/contacto.component'; 
@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacionComponent,
    InicioSesionComponent,
    ListaContrasenasComponent,
    SobreProyectoComponent,
    SnackbarActionComponent,
    FooterComponent,
    PerfilComponent,
    RestaurarComponent,
    ContactoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    MatCardModule,
    HttpClientModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
