import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { UserListService } from '../services/user-list.service';
import { tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  persona!: Usuario[];
  userLog!: Usuario;
  constructor(
    private userListSvc: UserListService, 
    private cookieSvc: CookieService) {}
  ngOnInit(): void {
    const userCookie = this.cookieSvc.get('user');
    this.userLog = JSON.parse(userCookie);//object
    console.log("obj "+userCookie.toUpperCase());

    
    this.userListSvc.getUsers().subscribe((user: Usuario[]) => {
      console.log("idlobby: "+this.userLog.lobbyId);
      this.persona = user.filter(user => (user.estadoLobby === true && user.lobbyId === this.userLog.lobbyId));//esta sala id se le enviara desde lobby
      console.log("persona "+this.persona);
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
