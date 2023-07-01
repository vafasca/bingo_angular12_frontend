import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lobby } from '../interfaces/lobby.interface';

@Injectable({
  providedIn: 'root'
})
export class LobbyListService {

  private apiURI = "http://localhost:3000/lobby";
  constructor(private http: HttpClient) { }

  getLobby(): Observable<Lobby[]>{
    return this.http.get<Lobby[]>(this.apiURI);
  }

  updateUsers(userId: number, estadoSend:boolean): Observable<Lobby>{
    const url = `${this.apiURI}/${userId}`;
    const body = { estadoLobby: estadoSend };
    return this.http.patch<Lobby>(url, body);
  }
}
