import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Usuario } from '../../services/usuario/usuario.class';
import  {UsuarioService}  from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss','../classes_padrao_scss/formatacao.scss'],
})

export class UsuarioPage implements OnInit {

  usuario: Usuario;
  // usuarioService: UsuarioService;

  constructor(private usuarioService:UsuarioService) { }

  async ngOnInit() {
    // this.usuario = await this.usuarioService.buscarPorIdComAnuncios(5);

    // console.log(this.usuario);
   
  }




}
