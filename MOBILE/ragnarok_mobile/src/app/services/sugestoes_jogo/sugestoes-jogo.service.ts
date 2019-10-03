import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SugestoesJogo } from './sugestoes_jogo.class';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SugestoesJogoService {

  url = environment.url;

  constructor(private http: HttpClient) { }

  getJogos(termo_pesquisa){
    return this.http.get<SugestoesJogo[]>(`${this.url}/sugestoes/${termo_pesquisa}/10`).pipe(
      map(data =>{
        const sugestoesJogoArray = data as any[];
        
        const sugestoes = sugestoesJogoArray.map(item => new SugestoesJogo(item));

        return sugestoes;
      })
    ).toPromise();
  }
}
