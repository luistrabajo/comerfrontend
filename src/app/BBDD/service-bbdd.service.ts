import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

import Login_usuario from './../DTO/login_user';
import Registro_user from '../DTO/registroUser'

@Injectable({
  providedIn: 'root'
})
export class ServiceBBDDService {

 


  API_URI = 'http://localhost:8080';
  constructor(private http:HttpClient,     
     private cookieService:CookieService) { }


  getHelloS(){
   
    return this.http.get(`${this.API_URI}/helloSecured`);
  }


  postCrearUser(registro_user: Registro_user) {
    return this.http.post(`${this.API_URI}/createUser`, registro_user);
  }

  postLogin(login_usuario: Login_usuario):any {

   
    return this.http.post(`${this.API_URI}/login`, JSON.stringify(login_usuario));
  }

  getUser(numero_documento: number ) {
    return this.http.get(`${this.API_URI}/buscarusuario/${numero_documento}`);
  }

  getHello() {
    return this.http.get(`${this.API_URI}/hello`);
  }




}
