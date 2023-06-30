import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  private apiURI = "http://localhost:3000/users";
  constructor(private http: HttpClient) { }

  getUsers(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.apiURI);
  }

  postUsers(user: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(this.apiURI, user);
  }

  updateUsers(userId: number, estadoSend:boolean): Observable<Usuario>{
    const url = `${this.apiURI}/${userId}`;
    const body = { estado: estadoSend };
    return this.http.patch<Usuario>(url, body);
  }
}
