import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Console } from './console.class';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  url = environment.url;
  constructor(private http: HttpClient) {}

  getConsoles(){
    return this.http.get<Console[]>(`${this.url}/console/todos`).pipe(
      map(data =>{
        const consolesArray = data as any[];

        const consoles = consolesArray.map(item => new Console(item));

        return consoles;
      })
    ).toPromise();
  }
}
