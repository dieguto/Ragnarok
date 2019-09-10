import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario.class';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) {}

    criarUsuario(usuario : Usuario){
      return this.http.post<Usuario>('http://localhost:3107/usuario/', {
        nome: usuario.nome,
        email: usuario.email,
        cep: usuario.cep,
        senha: usuario.senha
  
      }).toPromise();
  }
}
