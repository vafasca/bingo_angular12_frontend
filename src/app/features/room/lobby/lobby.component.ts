import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { UserListService } from '../services/user-list.service';
import { Usuario } from '../interfaces/usuario.interface';
import { LobbyListService } from '../services/lobby-list.service';
import { Lobby } from '../interfaces/lobby.interface';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit{
  idUser!: number;
  lobbys!: Lobby[];
  users!: Usuario[];
  nombre!: string;
  //usuario!: Usuario;//xxxxxx
  constructor(
    private router: Router, 
    private localVariable: LocalStorageService, 
    private update: UserListService,
    private lobbyList: LobbyListService,
    private cookieService: CookieService){}
  ngOnInit(): void {
    const userCookie = this.cookieService.get('user');
    const idLog = JSON.parse(userCookie);
    this.idUser = idLog.id
    this.lobbyList.getLobby().subscribe((lobby: Lobby[]) => {this.lobbys = lobby; console.log(this.lobbys);});
    this.update.getUsers().subscribe((users: Usuario[]) => {this.users = users; console.log(this.users);});
  }
  
  logout(): void {
    this.localVariable.clearUser()
    this.update.setLogout(this.idUser, false).subscribe();//cuando le da salir cambia estado a false
    this.router.navigate(['/login']);
  }

  join(user: Lobby){
    this.update.updateUser(this.idUser, true, user.id).subscribe();
    this.router.navigate(['/principal']);
  }
}
