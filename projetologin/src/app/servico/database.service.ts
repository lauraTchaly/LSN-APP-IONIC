import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { usuario } from '../model/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  HttpOptions = {
    Headers: new HttpHeaders({'content-type':'application/json'})
  }
  readonly API = "http://localhost:3000/usuario/";

  constructor(private http: HttpClient, ) { }

  getUsuario(){
    return this.http.get<usuario[]>(this.API);
  }
  getOneUsuario(cpf: number){
    return this.http.get<usuario>(this.API + cpf);

  }
  //METODO PARA CADASTRO DE USUARIO
  cadastro(dados: any){
    return this.http.post(this.API + JSON.stringify(dados), this.HttpOptions).subscribe()
  }
  updateUsuario(usuario: usuario, cpf: any){
     return this.http.put(this.API + cpf + JSON.stringify(usuario), this.HttpOptions).subscribe();
  }
}
