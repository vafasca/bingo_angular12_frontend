import { Component, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { UserListService } from '../services/user-list.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  persona!: Usuario[];

  constructor(private userListSvc: UserListService) {}
  ngOnInit(): void {
    this.userListSvc.getUsers().subscribe((user: Usuario[]) => {
      this.persona = user.filter(user => (user.estadoLobby === true && user.lobbyId === 1));//esta sala id se le enviara desde lobby
      console.log(this.persona);
    });
  }
}
