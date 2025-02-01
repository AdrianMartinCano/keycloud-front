import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ListaContrasenasComponent } from './lista-contrasenas/lista-contrasenas.component';
import { SobreProyectoComponent } from './sobre-proyecto/sobre-proyecto.component';
import { PerfilComponent } from './perfil/perfil.component';
import { RestaurarComponent } from './restaurar/restaurar.component';
import { ContactoComponent } from './contacto/contacto.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, 
  { path: 'inicio', component: InicioSesionComponent },
  { path: 'listaContrasenas', component: ListaContrasenasComponent},
  { path: 'sobreProyecto', component: SobreProyectoComponent },
  { path:'perfil', component: PerfilComponent },
  { path: 'restaurarContrasena', component: RestaurarComponent},
  {path: 'contacto', component: ContactoComponent},
  { path:'**', component: InicioSesionComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
