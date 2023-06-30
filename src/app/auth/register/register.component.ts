import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/features/room/interfaces/usuario.interface';
import { UserListService } from 'src/app/features/room/services/user-list.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  userForm!: FormGroup;
  constructor(private loadUser: UserListService, private formBuilder: FormBuilder, private router: Router){}

  logout(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      estado: [false],
      estadoLobby: [false],
      lobbyId: [0, Validators.required]
    });
  }

  onSubmit(){
    if (this.userForm.valid) {
      // Realizar acciones adicionales para registrar el usuario
      const newUser = this.userForm.value;
      this.loadUser.postUsers(newUser).subscribe((usuario: Usuario) => {
        this.router.navigate(['/login'])
        //this.userForm.reset();
      });
    }
  }
}
