import { Component, OnInit } from '@angular/core';
import {Storage} from '@ionic/storage';
import { Usuario } from '../../services/usuario/usuario.class';
import  {UsuarioService}  from '../../services/usuario/usuario.service';
import { environment } from 'src/environments/environment';
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
  anuncios: String;
  nome:String;
  url: any;
  foto: String;
  USUARIO_KEY: string;
  id:Number;
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

    this.usuario = await this.usuarioService.buscarPorIdComAnuncios(this.usuario_storage.id);

    this.url = environment.url;


    this.anuncios = this.usuario.anuncios;

    // this.foto = this.usuario.anuncios.c_fotos[0];


    console.log(this.anuncios);
   
  }


  async showModal(id_usuario){
    console.log(id_usuario);
    let modal = await this.modalCtrl.create({
      component : UsuarioEditModalPage,
      componentProps: {id3_usuario: "id_usuario"}

    });

    return await modal.present();
  }



}
