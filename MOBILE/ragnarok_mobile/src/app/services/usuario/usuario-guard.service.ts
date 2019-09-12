import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {UsuarioService} from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuardService implements CanActivate{

  constructor(private usuarioService: UsuarioService) { }

  canActivate():boolean{
    return this.usuarioService.isAuthenticated();
  }
}
