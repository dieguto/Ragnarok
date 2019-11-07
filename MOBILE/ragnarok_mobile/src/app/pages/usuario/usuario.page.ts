import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Usuario } from '../../services/usuario/usuario.class';
import  {UsuarioService}  from '../../services/usuario/usuario.service';
import { environment } from 'src/environments/environment';
import {Anuncio} from '../../services/anuncio/cadastro_anuncio/anuncio.class';
import { ModalController } from '@ionic/angular';
import { UsuarioEditModalPage } from '../usuario-edit-modal/usuario-edit-modal.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss','../classes_padrao_scss/formatacao_tolbar.scss'],
})

export class UsuarioPage implements OnInit {

  usuario: Usuario;
  usuario_storage: Usuario;
  anuncios:Anuncio;
  nome:String;
  foto: String;
  USUARIO_KEY: string;
  id:Number;
  url =  environment.url;
  // usuarioService: UsuarioService;
  public formConfirmarSenha : FormGroup;

  constructor(private usuarioService:UsuarioService, private storage:Storage,private modalCtrl: ModalController, formBuilder: FormBuilder) {
    this.formConfirmarSenha = formBuilder.group({
      senha:[null, Validators.required]
    });
   }


  async ngOnInit() {

 

    this.USUARIO_KEY = "usuario";
    this.usuario_storage = await this.storage.get(this.USUARIO_KEY);

    this.nome = this.usuario_storage.nome;
    this.id = this.usuario_storage.id;

    this.buscarJogos();
  
    console.log(this.usuario);
  }


  async showModal(id_usuario){
    console.log(id_usuario);
    let modal = await this.modalCtrl.create({
      component : UsuarioEditModalPage,
      componentProps: {id3_usuario: "id_usuario"}

    });

    return await modal.present();
  }


  async alert(){
    alert('aaaaaaaaa');
  }

  async buscarJogos(){
    try {
      this.USUARIO_KEY = "usuario";
      this.usuario_storage = await this.storage.get(this.USUARIO_KEY);
      this.usuario = await this.usuarioService.buscarAnunciosTipo(this.usuario_storage.id, 0, 0, 1);
      console.log(this.usuario);
      // this.anuncios = this.usuario.anuncios;
      // console.log(this.anuncios);
      return this.usuario;
    } catch (error) {

    }

  }

  async buscarConsole(){
    this.USUARIO_KEY = "usuario";
    this.usuario_storage = await this.storage.get(this.USUARIO_KEY);
    this.usuario = await this.usuarioService.buscarAnunciosTipo(this.usuario_storage.id, 1, 0, 0);
    console.log(this.usuario);
    // this.anuncios = this.usuario.anuncios;
    // console.log(this.anuncios);
    return this.usuario;
  }


  async buscarAcessorio(){
    try {
      this.USUARIO_KEY = "usuario";
      this.usuario_storage = await this.storage.get(this.USUARIO_KEY);
      this.usuario = await this.usuarioService.buscarAnunciosTipo(this.usuario_storage.id, 0, 1, 0);
      console.log(this.usuario);
      // this.anuncios = this.usuario.anuncios;
      // console.log(this.anuncios);
      return this.usuario;
    } catch (error) {
      console.log('Morais')
      this.usuario.info_rawg = '';
    }
  }




}
