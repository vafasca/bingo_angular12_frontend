import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  user!: FormGroup;
  loginError: boolean = false;

  constructor(private formBuilder: FormBuilder, private router: Router){}

  ngOnInit(): void {
    this.user = this.formBuilder.group({
      name: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', Validators.required)
    });
  }

  onSubmit() {
    if (this.user.valid) {
      // Validación exitosa, puedes realizar las acciones necesarias
      const username = this.user.value.name;
      const password = this.user.value.password;

      // Ejemplo de datos hardcodeados para validar el inicio de sesión
      if (username === 'usuario' && password === 'contraseña') {
        console.log('Inicio de sesión exitoso');
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
}
