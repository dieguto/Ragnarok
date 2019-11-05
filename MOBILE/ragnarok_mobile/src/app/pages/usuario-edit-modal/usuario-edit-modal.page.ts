
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { IonSlides, IonSegment, IonSlide, ModalController } from '@ionic/angular';
import { Usuario } from '../../services/usuario/usuario.class';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Storage} from '@ionic/storage';

@Component({
  selector: 'app-usuario-edit-modal',
  templateUrl: './usuario-edit-modal.page.html',
  styleUrls: ['./usuario-edit-modal.page.scss'],
})
export class UsuarioEditModalPage implements OnInit {

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  slideOpts: any = {allowTouchMove: false};
  public formConfirmarSenha : FormGroup;
  public formEditarUsuario : FormGroup;
  usuario: Usuario;
  usuarioEdit: Usuario;
  USUARIO_KEY: string;
  usuario_storage: Usuario;
  nome: String;
  cep: String;
  email:String;
  senha:String;
  id:Number;

  constructor(private modalCtrl: ModalController,  private storage:Storage, private usuarioService: UsuarioService, formBuilder: FormBuilder) { 

    this.formConfirmarSenha = formBuilder.group({
      senha:[null, Validators.required]
    });

    this.formEditarUsuario = formBuilder.group({
      nome:[null, Validators.required],
      cep:[null, Validators.required],
      email:[null, Validators.required],
      senha:[null, Validators.required]

    });
  }

  async ngOnInit() {

    this.USUARIO_KEY = "usuario";
    this.usuario_storage = await this.storage.get(this.USUARIO_KEY);
    this.usuario = await this.usuarioService.buscarCompleto(this.usuario_storage.id);
    this.nome = this.usuario.nome;
    this.cep = this.usuario.cep;
    this.email = this.usuario.email;
    this.id = this.usuario.id;
    console.log(this.usuario);

  }

// Metodo para fechar modal 

  async closeModal(){
    this.modalCtrl.dismiss();
  }


  // metodo para confirmar senha 

  async confirmarSenha(){
    try {
      // pegando os valores do formulario 
      this.usuario = this.formConfirmarSenha.value; 
      

      // usando javascript assincrono 
      const result = await this.usuarioService.confirmarSenha(this.usuario);
      console.log(this.usuario);
      console.log(result);
      this.senha = this.usuario.senha;
      console.log('eu sou a senha', this.senha);
      this.slides.slideNext();
    } 
    catch (error) {
      console.error(error);
      if(error.status === 404){
        console.error(error);
        alert("Senha incorreta");
      }
    }
  }


  async editarConta(){
    try {
      this.usuarioEdit = this.formEditarUsuario.value
      const result  = await this.usuarioService.update(this.usuarioEdit, this.id);
      this.closeModal();
      console.log(result);
      alert('cadastrou');

    } catch (error) {
      console.error(error);
    }
  }

}
