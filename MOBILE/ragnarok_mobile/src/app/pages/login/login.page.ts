import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { IonSlides, IonSegment, IonSlide, ToastController } from '@ionic/angular';
import { Usuario } from '../../services/usuario/usuario.class';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {Storage} from '@ionic/storage';
import { async } from '@angular/core/testing';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

    @ViewChild(IonSlides, { static: false }) slides: IonSlides;
    @ViewChild(IonSegment, { static: false }) segment: IonSegment;


    
  
  slideOpts: any = {allowTouchMove: false};
  public formCriarUsuario : FormGroup;
  public formFazerLogin :FormGroup;

  usuario: Usuario;
  constructor(private usuarioService: UsuarioService, formBuilder: FormBuilder, private toastCtrl: ToastController, private storage:Storage ) { 
      this.formCriarUsuario = formBuilder.group({
        nome:[null, Validators.required],
        cep:[null, Validators.required],
        email:[null, Validators.required],
        senha:[null, Validators.required]
    });

    this.formFazerLogin = formBuilder.group({
      email:[null, Validators.required],
      senha:[null, Validators.required]
    })
    

  }

  ngOnInit() {
    // this.usuario = new Usuario();
    const t = localStorage.getItem("token");
    if(t === null || t === undefined){
      localStorage.setItem("reiniciou", "nao");
    }
    
  }
// slide

  segmentChanged(event: any){
    let a = event.detail.value;
    if(event.detail.value === "login"){
      this.slides.slidePrev();
    }else{
      this.slides.slideNext();
    }

  }

// criando usuario
  async criarUsuario(){
    try {
      // pegando os valores do formulario 
      this.usuario = this.formCriarUsuario.value; 
      // usando javascript assincrono 
      const result = await this.usuarioService.criarUsuario(this.usuario);
      console.log(this.usuario);
      let toast =  await this.toastCtrl.create({
        message: 'Conta criada com sucesso', 
        duration: 2000,
        color: 'secondary'
      });

      toast.present();

      this.slides.slidePrev();
      this.segment.value = 'login';
      this.formCriarUsuario.reset();
      console.log(result);
    } 
    catch (error) {
      // if(error === 400 ){
        let toast =  await this.toastCtrl.create({
          message: 'erro ao criar sua conta', 
          duration: 2000,
          color: 'secondary'
        });

        toast.present();
      }
    }
  



   login(){
          this.usuario = this.formFazerLogin.value;    
          this.usuarioService.login(this.usuario).subscribe(async(result) =>{
              console.log(result);
              this.toast('Login efetuado com sucesso ');
              console.log('eu sou o token ',localStorage.getItem("token"));


              // setTimeout(() => {
              //   console.log(result);
              //   this.toast('Login efetuado com sucesso ');
              //   console.log('eu sou o token ',localStorage.getItem("token"));
                
              //   setTimeout(() => {
              //     window.location.reload();
              //   }, 2500);
                
              // }, 2000);
          }, async (error) =>{
            console.log('sou erro ', error);
            this.toast('Erro ao efetuar login');
           });
  }


  async toast(mensagem){
    let toast =  await this.toastCtrl.create({
      message: mensagem, 
      duration: 2000,
      color: 'secondary'
    });

    toast.onDidDismiss();

   toast.present();
  }

}
