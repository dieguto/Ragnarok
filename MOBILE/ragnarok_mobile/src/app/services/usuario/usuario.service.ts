import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from './usuario.class';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Storage} from '@ionic/storage';
import {environment} from '../../../environments/environment';
import {tap, catchError, map} from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';
import { Platform, AlertController } from '@ionic/angular';


const TOKEN_KEY = 'access_token';
const USUARIO_KEY = "usuario"

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
        return this.http.post(`${this.url}/auth/login/usuario/`, crendentials).pipe(
          tap(res =>{
            this.storage.set(TOKEN_KEY, res['token']);
            this.storage.set(USUARIO_KEY, res['usuario']);

            this.usuario = this.helper.decodeToken(res['token']);

            console.log(res['token']);
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
      return this.http.post<Usuario>(`${this.url}/usuario/`, {
        nome: usuario.nome,
        email: usuario.email,
        cep: usuario.cep,
        senha: usuario.senha
  
      }).toPromise();
  }

  buscarPorIdComAnuncios(id){
    console.log(`${this.url}/usuario/${id}/com/9999/anuncios`);

    return this.http.get<Usuario>(`${this.url}/usuario/${id}/com/9999/anuncios`, ).toPromise();

    // return this.http.get<Usuario[]>(`${this.url}/usuario/${id}/com/9999/anuncios`).pipe(
    //   map(data =>{
    //     // console.log(data);
    //     const usuario_anuncios_array = data as any[];

    //     const usuario_anuncios = usuario_anuncios_array.map(item => new Usuario(item));

    //     // const usuario = new Usuario(data);
    //     // console.log(usuario);
    //     return usuario_anuncios;
    //   })
    // ).toPromise();



    }


}
