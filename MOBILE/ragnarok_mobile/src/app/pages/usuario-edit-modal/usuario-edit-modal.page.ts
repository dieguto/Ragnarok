
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { IonSlides, IonSegment, IonSlide, ModalController } from '@ionic/angular';
import { Usuario } from '../../services/usuario/usuario.class';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-edit-modal',
  templateUrl: './usuario-edit-modal.page.html',
  styleUrls: ['./usuario-edit-modal.page.scss'],
})
export class UsuarioEditModalPage implements OnInit {

  @ViewChild(IonSlides, { static: false }) slides: IonSlides;
  slideOpts: any = {allowTouchMove: false};
  public formConfirmarSenha : FormGroup;
  usuario: Usuario;
  constructor(private modalCtrl: ModalController, private usuarioService: UsuarioService, formBuilder: FormBuilder) { 

    this.formConfirmarSenha = formBuilder.group({
      senha:[null, Validators.required]
    });
  }

  ngOnInit() {
    // this.usuario = new Usuario();
  }

  async closeModal(){
    this.modalCtrl.dismiss();
  }

  async confirmarSenha(){
    try {
      // pegando os valores do formulario 
      this.usuario = this.formConfirmarSenha.value; 
      // usando javascript assincrono 
      const result = await this.usuarioService.confirmarSenha(this.usuario);
      console.log(this.usuario);

      // this.slides.slidePrev();
      // this.segment.value = 'login';
      // this.formCriarUsuario.reset();
      console.log(result);
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

}
