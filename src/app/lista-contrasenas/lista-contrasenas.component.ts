import { Component } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
@Component({
  selector: 'app-lista-contrasenas',
  templateUrl: './lista-contrasenas.component.html',
  styleUrls: ['./lista-contrasenas.component.css']
})
export class ListaContrasenasComponent {
  idUserName: string = '';
  constructor(private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.idUserName = this.authService.getIdUserName();
  }

}
