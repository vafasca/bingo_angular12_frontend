import { Component } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})

export class UserListComponent {
  
  personas: Usuario[] = [
    { 
      id: 1,
      player: 'Bruno Ortiz' 
    },
    { 
      id: 2,
      player: 'Alejandro Velasquez' 
    },
    { 
      id: 3,
      player: 'Pepe Sanches' 
    },
    { 
      id: 4,
      player: 'Bruno Ortiz' 
    },
    { 
      id: 5,
      player: 'Alejandro Velasquez' 
    },
    { 
      id: 6,
      player: 'Pepe Sanches' 
    },
    { 
      id: 7,
      player: 'Bruno Ortiz' 
    },
    { 
      id: 8,
      player: 'Alejandro Velasquez' 
    },
    { 
      id: 9,
      player: 'Pepe Sanches' 
    },
    { 
      id: 10,
      player: 'Pepe Sanches' 
    },
    { 
      id: 11,
      player: 'Alejandro Velasquez' 
    }
  ];
}
