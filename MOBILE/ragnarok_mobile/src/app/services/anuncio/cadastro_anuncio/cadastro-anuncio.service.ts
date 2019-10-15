import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Anuncio } from './anuncio.class';

@Injectable({
  providedIn: 'root'
})
export class CadastroAnuncioService {

  url =  environment.url;
 
  constructor(private http: HttpClient) { }

  criarAnuncio(anuncio: Anuncio, fotos){

    console.log({
      titulo: anuncio.titulo,
      descricao: anuncio.descricao,
      is_jogo:true,
      slug_jogo: anuncio.slug_jogo,
      id_genero: anuncio.id_genero,
      id_console_troca: anuncio.id_console_troca,
      slug_jogo_troca: anuncio.slug_jogo_troca,
      preco: anuncio.preco,
      array_fotos_base64: fotos
    });

    console.log(typeof fotos);

    console.log(fotos);



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
    }).toPromise();
  }
}
