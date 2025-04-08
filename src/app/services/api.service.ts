import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserInfo } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly httpClient: HttpClient = inject(HttpClient);
  private url: string = "http://127.0.0.1:5000/";

  constructor() { }

  sendRegister(user: UserInfo): Observable<any> {
    try {
      return this.httpClient.post(`${this.url}cifrar_usuario`,user);
    } catch (error) {
      throw new Error("Error: " + error);
    }
  }
}
