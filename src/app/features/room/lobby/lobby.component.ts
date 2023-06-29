import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent {
  constructor(private router: Router){}
  logout(): void {
    // Realiza cualquier lógica adicional antes de salir
    // Navega hacia la página de login
    console.log('saliendo');
    this.router.navigate(['/login']);
  }
}
