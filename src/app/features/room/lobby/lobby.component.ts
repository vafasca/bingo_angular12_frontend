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
  prueba!: number;
  cookieUser!: Usuario;
  //usuario!: Usuario;//xxxxxx
  probando!: Usuario | null;
  constructor(
    private router: Router, 
    private localVariable: LocalStorageService, 
    private update: UserListService,
    private lobbyList: LobbyListService,
    private cookieService: CookieService){}
  ngOnInit(): void {
    this.localVariable.asObservable().subscribe((user: Usuario | null) => {
      if (user) {
        this.idUser = user.id;
        this.cookieUser = user;
        this.cookieUser.estado = true;
      } else {
        
        // Aquí puedes asignar un valor predeterminado si no hay usuario disponible
      }
    });
    
    this.lobbyList.getLobby().subscribe((lobby: Lobby[]) => {this.lobbys = lobby;});
    this.update.getUsers().subscribe((users: Usuario[]) => {this.users = users;});
    console.log("userCooie: "+JSON.stringify(this.cookieUser));

  }
  
  logout(): void {//se puede cambiar idUser por cookie.idprobar 
    this.localVariable.clearUser()//cookieSvc
    alert("Saliendoo: "+"id "+this.idUser+"estado "+false);
    this.update.setLogout(this.idUser, false).subscribe();//cuando le da salir cambia estado a false
    this.router.navigate(['/login']);
  }

  join(lobby: Lobby){
    alert("join: "+this.idUser+"loby: "+lobby.id+"cookier: "+this.cookieUser);
    this.update.updateUser(this.idUser, true, lobby.id).subscribe();
    this.cookieUser.lobbyId = lobby.id;
    this.cookieUser.estadoLobby = true;

    //pobando metodo next del cookieSvc
    this.localVariable.nexts(this.cookieUser);
    //console.log("cookieUser: " +this.cookieUser.lobbyId);
    this.router.navigate(['/principal']);
  }
}
