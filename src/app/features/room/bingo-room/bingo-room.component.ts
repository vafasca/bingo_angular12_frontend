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

  userLog!: number;

  constructor(
    private localStorgeSvc: LocalStorageService,
    private router: Router,
    private update: UserListService){}
  ngOnInit(): void {
    this.localStorgeSvc.asObservable().subscribe((user) => {this.userLog = user?.lobbyId ?? 0; console.log("POLLO: "+user?.lobbyId);});
  }

  logout(): void {//se puede cambiar idUser por cookie.idprobar 
    //this.localStorgeSvc.clearUser()//cookieSvc
    //alert("Saliendo: "+"id "+this.idUser+"estado "+false);
    //this.update.setLogout(this.idUser, false).subscribe();//cuando le da salir cambia estado a false
    alert("saliendo"+this.userLog);
    this.router.navigate(['/lobby']);
  }
}
