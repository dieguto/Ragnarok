import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  url =  environment.url;

  constructor(private http: HttpClient, private storage:Storage) { }

  async ativarChat(id_chat){
    const TOKEN_KEY = 'access_token';
    const token = await this.storage.get(TOKEN_KEY);

    var xxx = {   
      "Accept": 'application/json',
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + token
    };

    // alert("JSON do ativar: " + JSON.stringify(xxx));


    const httpOptions = {
      headers: new HttpHeaders({   
        "Accept": 'application/json',
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };



    console.log("url do aceitar chat", `http://3.92.51.72:3108/chat/ativar/${id_chat}`)

    return this.http.patch(`http://3.92.51.72:3107/chat/ativar/${id_chat}`, {}, httpOptions).toPromise();
  }

  async deletarChat(id_chat){
    const TOKEN_KEY = 'access_token';
    const token = await this.storage.get(TOKEN_KEY);

    var xxx = {   
      "Accept": 'application/json',
      'Content-Type':  'application/json',
      'Authorization': 'Bearer ' + token
    };

    // alert("JSON do ativar: " + JSON.stringify(xxx));


    const httpOptions = {
      headers: new HttpHeaders({   
        "Accept": 'application/json',
        'Content-Type':  'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.delete(`http://3.92.51.72:3107/chat/${id_chat}`, httpOptions).toPromise();


  }
}
