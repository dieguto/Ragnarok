import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-usuario-edit-jogos-modal',
  templateUrl: './usuario-edit-jogos-modal.page.html',
  styleUrls: ['./usuario-edit-jogos-modal.page.scss', '../classes_padrao_scss/formatacao.scss'],
})
export class UsuarioEditJogosModalPage implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  async closeModal(){
    this.modalCtrl.dismiss();
  }


}
