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
  user!: Usuario[];

  constructor(private loadUser: UserListService, private formBuilder: FormBuilder, private router: Router, private localStorage: LocalStorageService){}

  logout(){
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.getList();
    this.userForm = this.formBuilder.group({
      id: ['', Validators.required],
      user: ['', Validators.required],
      password: ['', Validators.required],
      estado: [false],
      estadoLobby: [false],
      lobbyId: [0, Validators.required]
    });
  }

  getList(){
    this.loadUser.getUsers().subscribe((usuario: Usuario[]) => {
      this.user = usuario;
      this.setFormId();
    });
  }

  setFormId() {
  if (this.user && this.user.length > 0) {
    let lastId = this.user[this.user.length - 1].id;
    this.userForm.get('id')!.setValue(lastId + 1); // Asigna el valor al campo "id"
  } else {
    this.userForm.get('id')!.setValue(1); // Si la lista está vacía, asigna 1 como valor inicial
  }
}

  onSubmit(){
    if (this.userForm.valid) {
      // Realizar acciones adicionales para registrar el usuario
      const newUser = this.userForm.value;
      this.loadUser.postUsers(newUser).subscribe((usuario: Usuario) => {
        this.router.navigate(['/login']);
        //this.userForm.reset();
      });
      alert("Usuario registrado");
    }
  }
}
