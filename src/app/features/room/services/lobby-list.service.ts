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
}
