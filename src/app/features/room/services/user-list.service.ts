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

  setLogout(userId: number, estadoSend:boolean): Observable<Usuario>{
    const url = `${this.apiURI}/${userId}`;
    const body = { estado: estadoSend, lobbyId: 0, estadoLobby: false };
    return this.http.patch<Usuario>(url, body);
  }

  updateUser(idUser: number, lobby: boolean, lobbyId: number): Observable<Usuario>{
    const url = `${this.apiURI}/${idUser}`;
    const body = {estadoLobby: lobby, lobbyId: lobbyId};
    return this.http.patch<Usuario>(url, body)
  }
}
