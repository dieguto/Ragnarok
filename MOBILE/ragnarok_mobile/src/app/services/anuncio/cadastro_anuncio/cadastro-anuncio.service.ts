import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Anuncio } from './anuncio.class';
import {Storage} from '@ionic/storage';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CadastroAnuncioService {

  url =  environment.url;
 
 
  constructor(private http: HttpClient, private storage:Storage) { }

  async criarAnuncio(anuncio: Anuncio, fotos){

    const TOKEN_KEY = 'access_token';
    const token = await this.storage.get(TOKEN_KEY);
    // alert(token);


    const httpOptions = {
      headers: new HttpHeaders({
        "Accept": 'application/json',
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };


    return this.http.post<Anuncio>(`${this.url}/anuncio`,{
      titulo: anuncio.titulo,
      descricao: anuncio.descricao,
      is_jogo:true,
      slug_jogo: anuncio.slug_jogo,
      id_genero: anuncio.id_genero,
      id_console_troca: anuncio.id_console_troca,
      id_console: anuncio.id_console,
      slug_jogo_troca: anuncio.slug_jogo_troca,
      preco: anuncio.preco,
      array_fotos_base64: [fotos]
    }, httpOptions).toPromise();
  }

  async criarAcessorio(anuncio: Anuncio, fotos){

    const TOKEN_KEY = 'access_token';
    const token = await this.storage.get(TOKEN_KEY);
    // alert(token);


    const httpOptions = {
      headers: new HttpHeaders({   
        "Accept": 'application/json',
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };


    return this.http.post<Anuncio>(`${this.url}/anuncio`,{
      titulo: anuncio.titulo,
      descricao: anuncio.descricao,
      is_acessorio:true,
      id_console: anuncio.id_console,
      preco: anuncio.preco,
      array_fotos_base64: [fotos]
    }, httpOptions).toPromise();
  }


  async criarConsole(anuncio: Anuncio, fotos){

    const TOKEN_KEY = 'access_token';
    const token = await this.storage.get(TOKEN_KEY);
    // alert(token);


    const httpOptions = {
      headers: new HttpHeaders({   
        "Accept": 'application/json',
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };


    return this.http.post<Anuncio>(`${this.url}/anuncio`,{
      titulo: anuncio.titulo,
      descricao: anuncio.descricao,
      is_console:true,
      id_console: anuncio.id_console,
      preco: anuncio.preco,
      array_fotos_base64: [fotos]
    }, httpOptions).toPromise();
  }


  async buscarTodosHome(max, pagina:number){

    const USUARIO_KEY = "usuario";
    const usuario = await this.storage.get(USUARIO_KEY);
    console.log(pagina);

    console.log(`${this.url}/anuncios/todos/${usuario.id}/0/${pagina}/5/distancia/0/${max}/asc`);
    return this.http.get<Anuncio[]>(`${this.url}/anuncios/todos/${usuario.id}/0/${pagina}/5/distancia/0/${max}/asc`).pipe(
      map(data => {
        const anunciosArray = data as any[];

        const anuncios = anunciosArray.map(item => new Anuncio(item));

        return anuncios;
      })
    ).toPromise();
  }


  async buscarTodosPesquisa(max, pagina:number, termo_pesquisa){

    const USUARIO_KEY = "usuario";

    termo_pesquisa = termo_pesquisa || 0;
    const usuario = await this.storage.get(USUARIO_KEY);
    console.log(pagina);

    console.log(`${this.url}/anuncios/todos/${usuario.id}/0/${pagina}/5/distancia/0/${max}/asc`);
    return this.http.get<Anuncio[]>(`${this.url}/anuncios/todos/${usuario.id}/${termo_pesquisa}/${pagina}/100/distancia/0/${max}/asc`).pipe(
      map(data => {
        const anunciosArray = data as any[];

        const anuncios = anunciosArray.map(item => new Anuncio(item));

        return anuncios;
      })
    ).toPromise();
  }

  async buscarPorCategoria(max, pagina:number, id_genero){

    const USUARIO_KEY = "usuario";
    const usuario = await this.storage.get(USUARIO_KEY);
    console.log(pagina);

    console.log(`${this.url}/anuncios/jogos/${usuario.id}/0/${id_genero}/0/${pagina}/100/distancia/0/${max}/asc`);
    return this.http.get<Anuncio[]>(`${this.url}/anuncios/jogos/${usuario.id}/0/${id_genero}/0/${pagina}/100/distancia/0/${max}/asc`).pipe(
      map(data => {
        const anunciosArray = data as any[];

        const anuncios = anunciosArray.map(item => new Anuncio(item));

        return anuncios;
      })
    ).toPromise();
  }

  async buscarPorID(id){
    console.log(`${this.url}/anuncio/${id}`);
    return this.http.get<Anuncio>(`${this.url}/anuncio/${id}`, ).toPromise();

  }


}
