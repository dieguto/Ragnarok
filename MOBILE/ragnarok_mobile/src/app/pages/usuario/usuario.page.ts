import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Usuario } from '../../services/usuario/usuario.class';
import  {UsuarioService}  from '../../services/usuario/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss','../classes_padrao_scss/formatacao_tolbar.scss'],
})

export class UsuarioPage implements OnInit {

  usuario: Usuario;
  usuario_storage: Usuario;
  anuncios: String;
  nome:String;
  url: any;
  foto: String;
  USUARIO_KEY: string;
  // usuarioService: UsuarioService;
 

  constructor(private usuarioService:UsuarioService, private storage:Storage) { }

  async ngOnInit() {

    this.USUARIO_KEY = "usuario";
    this.usuario_storage = await this.storage.get(this.USUARIO_KEY);

    this.nome = this.usuario_storage.nome;

    this.usuario = await this.usuarioService.buscarPorIdComAnuncios(5);

    this.url = environment.url;


    this.anuncios = this.usuario.anuncios;

    // this.foto = this.usuario.anuncios.c_fotos[0];


    console.log(this.anuncios);
   
  }




}
