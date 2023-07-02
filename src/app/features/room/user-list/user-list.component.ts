import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { UserListService } from '../services/user-list.service';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  persona!: Usuario[];
  userLog!: Usuario;

  idUser!: number;
  cookieUser!: Usuario;
  constructor(
    private userListSvc: UserListService, 
    private cookieSvc: CookieService,
    private localStorageSvc: LocalStorageService) {}
  ngOnInit(): void {
    //const userCookie = this.cookieSvc.get('user');
    //this.userLog = JSON.parse(userCookie);//object
    //alert("obj "+userCookie.toUpperCase());
    //
    this.localStorageSvc.asObservable().subscribe((user: Usuario | null) => {
      if (user) {
        this.idUser = user.id;
        this.cookieUser = user;
      } else {
        console.log("no hay nada");
        // Aquí puedes asignar un valor predeterminado si no hay usuario disponible
      }
    });
    console.log("idUser: "+this.idUser);
    //
    console.log("object "+JSON.stringify(this.cookieUser));
    //
    
    this.userListSvc.getUsers().subscribe((user: Usuario[]) => {
      //alert("idlobby: "+JSON.stringify(this.userLog.lobbyId));
      this.persona = user.filter(user => (user.estadoLobby === true && user.lobbyId === this.cookieUser.lobbyId));//esta sala id se le enviara desde lobby
    });

    // interval(2000) // Emite un valor cada 2 segundos
    // .pipe(
    //   switchMap(() => this.userListSvc.getUsers())
    // )
    // .subscribe((users: Usuario[]) => {
    //   console.log("idlobby: " + this.userLog.lobbyId);
    //   this.persona = users.filter(user => (user.estadoLobby === true && user.lobbyId === this.userLog.lobbyId));
    //   console.log("persona ", this.persona);
    // });
  }
}
