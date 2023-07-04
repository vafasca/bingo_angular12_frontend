import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Router } from '@angular/router';
import { UserListService } from '../services/user-list.service';
import { Usuario } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-bingo-room',
  templateUrl: './bingo-room.component.html',
  styleUrls: ['./bingo-room.component.css']
})
export class BingoRoomComponent implements OnInit{

  cookieUser!: Usuario;
  idUser!: number;

  constructor(
    private localStorgeSvc: LocalStorageService,
    private router: Router,
    private userListSvc: UserListService){}
  ngOnInit(): void {
    //this.localStorgeSvc.asObservable().subscribe((user) => {this.userCookie = user; this.userLog = user?.id});
    this.localStorgeSvc.asObservable().subscribe((user: Usuario | null) => {
      if (user) {
        this.idUser = user.id;
        this.cookieUser = user;
      } else {
        
        // Aquí puedes asignar un valor predeterminado si no hay usuario disponible
      }
    });
    console.log("idUsuario: "+this.idUser, "usuario: "+JSON.stringify(this.cookieUser))
  }

  logout(): void {//se puede cambiar idUser por cookie.idprobar 
    this.cookieUser.estadoLobby = false;
    this.cookieUser.lobbyId = 0;
    this.localStorgeSvc.nexts(this.cookieUser);
    this.userListSvc.setLogout(this.idUser, false).subscribe();//cuando le da salir cambia estado a false
    alert("saliendo"+this.idUser);
    this.router.navigate(['/lobby']);
  }
}
