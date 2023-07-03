import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/features/room/interfaces/usuario.interface';
import { LocalStorageService } from 'src/app/features/room/services/local-storage.service';
import { UserListService } from 'src/app/features/room/services/user-list.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user!: FormGroup;
  loginError: boolean = false;
  userList!: Usuario[];//lista de usuarios

  constructor(private formBuilder: FormBuilder, private router: Router, private userLog: UserListService, private localStorageSvc: LocalStorageService){}

  ngOnInit(): void {
    this.saveUsers();
    this.user = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', Validators.required)
    });
  }

  onRegister(){
    this.router.navigate(['/register']);
  }

  onSubmit() {
    if (this.user.valid) {
      // Validación exitosa, puedes realizar las acciones necesarias
      const username = this.user.value.name;
      const password = this.user.value.password;
      
      let usuario = this.userList.find(usuario => usuario.user === username);
      //let pass = this.userList.some(usuario => usuario.password === password);
      
      // Ejemplo de datos hardcodeados para validar el inicio de sesión
      if (usuario && usuario.password === password) {

        //this.saveUsers(usuario.id);
        this.localStorageSvc.nexts(usuario);
        this.userLog.setLogout(usuario.id, true).subscribe();
        //this.localStorageSvc.variableCompartida = usuario.id;

        alert('Inicio de sesión exitoso');
        this.router.navigate(['/lobby']);
        this.user.reset();
        // Realizar acciones adicionales después del inicio de sesión exitoso
      } else {
        alert('Credenciales de inicio de sesión inválidas');
        // Mostrar mensaje de error de inicio de sesión
        this.loginError = true;
        this.user.reset();
      }
    }
  }

  saveUsers(): void{
    this.userLog.getUsers().subscribe((user: Usuario[]) => 
    {
      // this.localStorageSvc.nexts(user[id]);
      this.userList = user;
    });
  }
}
