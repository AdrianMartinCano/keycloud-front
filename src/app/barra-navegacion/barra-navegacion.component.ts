import { Component  } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-barra-navegacion',
  templateUrl: './barra-navegacion.component.html',
  styleUrls: ['./barra-navegacion.component.css'],
  

})
export class BarraNavegacionComponent {

  
  constructor(
    public authService: AuthServiceService,private router: Router) {}

 goToProfile() {
    this.router.navigate(['/perfil']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/inicio']);
  }
  
  goToPassWordList(){
    if(this.authService.isLoggedIn()){
      this.router.navigate(['/listaContrasenas']);
  }else{
    this.router.navigate(['/inicio']);
  }
}
 
}