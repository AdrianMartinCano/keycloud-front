import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarraNavegacionComponent } from './barra-navegacion/barra-navegacion.component';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { ListaContrasenasComponent } from './lista-contrasenas/lista-contrasenas.component';
import { SobreProyectoComponent } from './sobre-proyecto/sobre-proyecto.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' }, 
  { path: 'inicio', component: InicioSesionComponent },
  { path: 'listaContrasenas', component: ListaContrasenasComponent},
  { path: 'sobreProyecto', component: SobreProyectoComponent },
  { path:'perfil', component: PerfilComponent },
  { path:'**', component: InicioSesionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
