import { Component, OnInit, ViewChild  } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Usuario } from '../../services/usuario/usuario.class';
import  {UsuarioService}  from '../../services/usuario/usuario.service';
import { environment } from 'src/environments/environment';
import {Anuncio} from '../../services/anuncio/cadastro_anuncio/anuncio.class';
import { ModalController, IonContent, IonRefresher } from '@ionic/angular';
import { UsuarioEditModalPage } from '../usuario-edit-modal/usuario-edit-modal.page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioEditJogosModalPage } from '../usuario-edit-jogos-modal/usuario-edit-jogos-modal.page';
import { UsuarioEditConsoleModalPage } from '../usuario-edit-console-modal/usuario-edit-console-modal.page';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.page.html',
  styleUrls: ['./usuario.page.scss','../classes_padrao_scss/formatacao_tolbar.scss'],
})

export class UsuarioPage implements OnInit {

  usuario: Usuario;
  usuario_storage: Usuario;
  usuario_perfil:Usuario;
  anuncios:Anuncio;
  nome:String;
  foto: String;
  USUARIO_KEY: string;
  id:Number;
  
  url =  environment.url;
  public formConfirmarSenha : FormGroup;
  @ViewChild(IonRefresher, { static: false }) refresher: IonRefresher;

  constructor(private usuarioService:UsuarioService, private storage:Storage,private modalCtrl: ModalController, formBuilder: FormBuilder) {
    this.formConfirmarSenha = formBuilder.group({
      senha:[null, Validators.required]
    });
   }


  async ngOnInit() {
   
    
    }

    async ionViewWillEnter() {
      this.USUARIO_KEY = "usuario";
      this.usuario_storage = await this.storage.get(this.USUARIO_KEY);
      this.buscarJogos();
      this.usuario_perfil = await this.usuarioService.buscarCompleto(this.usuario_storage.id);
      this.nome = this.usuario_perfil.nome;
      this.id = this.usuario_perfil.id;
  }

  async showModal(id_usuario){
    console.log(id_usuario);
    let modal = await this.modalCtrl.create({
      component : UsuarioEditModalPage,
      componentProps: {id3_usuario: "id_usuario"}

    });

    return await modal.present();
  }


  async showModalAnuncios(id_anuncio, tipo_anuncio){

    if(tipo_anuncio === null){
      console.log(id_anuncio);
      let modal = await this.modalCtrl.create({
        component : UsuarioEditConsoleModalPage,
        componentProps: {id_anuncio: id_anuncio}
  
      });

      return await modal.present();
    }else if(tipo_anuncio){
      console.log(id_anuncio);
      let modal = await this.modalCtrl.create({
        component : UsuarioEditJogosModalPage,
        componentProps: {id_anuncio: id_anuncio}
  
      });
      return await modal.present();
    }

    
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
      // console.log(this.usuario);
      // this.anuncios = this.usuario.anuncios;
      // console.log(this.anuncios);
      return this.usuario;
    } catch (error) {
      console.log('Morais')
      this.usuario.info_rawg = '';
    }
  }

async recarregar(){
  this.USUARIO_KEY = "usuario";
  this.usuario_storage = await this.storage.get(this.USUARIO_KEY);
  this.buscarJogos();
  this.usuario_perfil = await this.usuarioService.buscarCompleto(this.usuario_storage.id);
  this.nome = this.usuario_perfil.nome;
  this.id = this.usuario_perfil.id;

  setTimeout(() => {
    console.log('Async operation has ended');
    this.refresher.complete();
  }, 500);
}




}
