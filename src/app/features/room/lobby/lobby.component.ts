import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { UserListService } from '../services/user-list.service';
import { Usuario } from '../interfaces/usuario.interface';
import { LobbyListService } from '../services/lobby-list.service';
import { Lobby } from '../interfaces/lobby.interface';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit{
  idUser!: number;
  lobbys!: Lobby[];
  users!: Usuario[];
  constructor(
    private router: Router, 
    private localVariable: LocalStorageService, 
    private update: UserListService,
    private lobbyList: LobbyListService){}
  ngOnInit(): void {
    this.localVariable.asObservable().subscribe((user: Usuario) => {this.idUser = user.id; console.log(user);});
    this.lobbyList.getLobby().subscribe((lobby: Lobby[]) => {this.lobbys = lobby; console.log(this.lobbys);});
    this.update.getUsers().subscribe((users: Usuario[]) => {this.users = users; console.log(this.users);});
  }
  
  logout(): void {
    // Realiza cualquier lógica adicional antes de salir
    // Navega hacia la página de login
    this.update.updateUsers(this.idUser, false).subscribe();//cuando le da salir cambia estado a false
    this.router.navigate(['/login']);
  }

  join(){
    console.log("dentro");
  }
}
