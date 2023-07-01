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
  constructor(
    private router: Router, 
    private localVariable: LocalStorageService, 
    private update: UserListService,
    private lobbyList: LobbyListService,
    private cookieService: CookieService){}
  ngOnInit(): void {
    const userCookie = this.cookieService.get('user');
    const idLog = JSON.parse(userCookie);//object
    this.idUser = idLog.id
    this.cookieUser = idLog;
    console.log("asas "+this.cookieUser);
    this.lobbyList.getLobby().subscribe((lobby: Lobby[]) => {this.lobbys = lobby; console.log(this.lobbys);});
    this.update.getUsers().subscribe((users: Usuario[]) => {this.users = users; console.log(this.users);});
    //
    
    //this.localVariable.asObservable().subscribe((userC) => {this.idUser = userC?.lobbyId ?? 0; console.log("PPP"+userC?.lobbyId);});
    //const chou = JSON.parse(prueba);//object
    //console.log("PPPPP"+chou);
  }
  
  logout(): void {//se puede cambiar idUser por cookie.idprobar 
    this.localVariable.clearUser()//cookieSvc
    alert("Saliendoo: "+"id "+this.idUser+"estado "+false);
    this.update.setLogout(this.idUser, false).subscribe();//cuando le da salir cambia estado a false
    this.router.navigate(['/login']);
  }

  join(lobby: Lobby){
    console.log("join: "+this.idUser);
    this.update.updateUser(this.idUser, true, lobby.id).subscribe();
    //this.cookieUser.lobbyId = lobby.id;
    // Convierte nuevamente el objeto en una cadena JSON
    //let nuevaCookieValue = JSON.stringify(this.cookieUser);
    //this.cookieService.set('user', nuevaCookieValue);

    //pobando metodo next del cookieSvc
    this.localVariable.nexts(this.cookieUser);
    //console.log("cookieUser: " +this.cookieUser.lobbyId);
    this.router.navigate(['/principal']);
  }
}
