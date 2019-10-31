
import { Component, OnInit, ViewChild, ElementRef, TemplateRef } from '@angular/core';
import { IonSlides, IonSegment, IonSlide } from '@ionic/angular';
import { Usuario } from '../../services/usuario/usuario.class';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-usuario-edit-modal',
  templateUrl: './usuario-edit-modal.page.html',
  styleUrls: ['./usuario-edit-modal.page.scss'],
})
export class UsuarioEditModalPage implements OnInit {

  slideOpts: any = {allowTouchMove: false};

  ngOnInit() {
    // this.usuario = new Usuario();
  }
}
