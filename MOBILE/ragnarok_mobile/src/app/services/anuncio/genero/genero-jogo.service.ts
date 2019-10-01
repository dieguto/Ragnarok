import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Genero } from './genero_jogo.class';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroJogoService {
  url =  environment.url;
  constructor(private http: HttpClient) { }

  getGeneros(){
    return this.http.get<Genero[]>(`${this.url}/genero/todos`).pipe(
      map(data =>{
        const generosArray = data as any[];

        const generos = generosArray.map(item => new Genero(item));

        return generos;
      })
    ).toPromise();
  }
}
