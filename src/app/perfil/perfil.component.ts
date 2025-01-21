import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { Usuario } from '../models/usuario';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  idUsuario: string='';
  usuario:Usuario={} as Usuario;

  constructor(public authservice: AuthServiceService) { }

  ngOnInit(): void {
    this.idUsuario = this.authservice.getIdUserName();
    this.authservice.isLoggedIn();
    console.log(this.authservice.isLoggedIn());
       this.authservice.getUsuario().subscribe(
      (data: Usuario) => {
        this.usuario = data;
      },
      error => {
        console.error('Error al obtener el usuario:', error);
      }
    );
  }
}