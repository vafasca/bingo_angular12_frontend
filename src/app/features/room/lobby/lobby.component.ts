import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { UserListService } from '../services/user-list.service';
import { Usuario } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit{
  idUser!: number;
  pruebaId!: number;
  constructor(private router: Router, private localVariable: LocalStorageService, private update: UserListService){}
  ngOnInit(): void {
    this.localVariable.asObservable().subscribe((user: Usuario) => {this.idUser = user.id});
  }
  
  logout(): void {
    // Realiza cualquier lógica adicional antes de salir
    // Navega hacia la página de login
    this.update.updateUsers(this.idUser, false).subscribe();
    this.router.navigate(['/login']);
  }
}
