import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario.class';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Storage} from '@ionic/storage';
import {environment} from '../../../environments/environment';
import {tap, catchError} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import { Platform, AlertController } from '@ionic/angular';


const TOKEN_KEY = 'access_token';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url =  environment.url;
  usuario = null;
  authenticationState = new BehaviorSubject(false);

  constructor(private http: HttpClient, 
              private helper: JwtHelperService, 
              private storage:Storage,
              private plt: Platform, 
              private alertControlller: AlertController) {
                this.plt.ready().then(()=>{
                  this.checkToken();
                })
              }


      checkToken(){
        this.storage.get(TOKEN_KEY).then(token => {
          if(token){
            let decoded = this.helper.decodeToken(token);
            let isExpired = this.helper.isTokenExpired(token);

            if(!isExpired){
              this.usuario = decoded;
              this.authenticationState.next(true);
            }else{
              this.storage.remove(TOKEN_KEY);
            }
          }

        });
      }
  
      login(crendentials){
        return this.http.post(`${this.url}/login/usuario`, crendentials).pipe(
          tap(res =>{
            this.storage.set(TOKEN_KEY, res['token']);
            this.usuario = this.helper.decodeToken(res['token']);
            this.authenticationState.next(true);
          }),
          catchError(e =>{
            console.log(e.error.msg);
            throw new Error(e);
          })
        );
      }


      isAuthenticated(){
        return this.authenticationState.value;
      }




    criarUsuario(usuario : Usuario){
      return this.http.post<Usuario>('http://localhost:3107/usuario/', {
        nome: usuario.nome,
        email: usuario.email,
        cep: usuario.cep,
        senha: usuario.senha
  
      }).toPromise();
  }
}
