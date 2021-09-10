import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url = "https://run.mocky.io"


  constructor(private http : HttpClient) { }

  getRubrica(){
    return this.http.get(this.url + "/v3/373ff9f3-9db5-473e-a0ec-b5abac0b4328");
  }

  postContact(){
    let body = {
      "name" : "Giuseppe",
      "surname" : "Verdi",
      "telephoneNumber" : "3219875432",
      "email" : "giuseppeverdi@gmail.com",
      "birthday" : "21/11/2000"
  }
    return this.http.post(this.url + "/v3/373ff9f3-9db5-473e-a0ec-b5abac0b4328", body);
  }
}
