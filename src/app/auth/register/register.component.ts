import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/features/room/interfaces/usuario.interface';
import { LocalStorageService } from 'src/app/features/room/services/local-storage.service';
import { UserListService } from 'src/app/features/room/services/user-list.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  userForm!: FormGroup;
  userList!: Usuario[];

  constructor(private loadUser: UserListService, private formBuilder: FormBuilder, private router: Router, private localStorage: LocalStorageService){}

  logout(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getList();
    let lastId = this.userList[this.userList.length - 1];
    let id = lastId.id+1;

    this.userForm = this.formBuilder.group({
      id: [id, Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      estado: [false],
      estadoLobby: [false],
      lobbyId: [0, Validators.required]
    });
  }

  getList(){
    this.localStorage.asObservable().subscribe((user: Usuario[]) => {
      this.userList = user;
      console.log("localRegister: "+user);
    });
  }

  onSubmit(){
    if (this.userForm.valid) {
      // Realizar acciones adicionales para registrar el usuario
      const newUser = this.userForm.value;
      this.loadUser.postUsers(newUser).subscribe((usuario: Usuario) => {
        this.router.navigate(['/login']);
        //this.userForm.reset();
      });
    }
  }
}
