import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  users!: Usuario[];
  userListSubject!: BehaviorSubject<Usuario[]>;

  constructor() {
    this.users = [];
    this.userListSubject = new BehaviorSubject<Usuario[]>(this.users);
   }

  nexts(user: Usuario[]): void{
    this.users = user;
    this.userListSubject.next(this.users);
  }

  asObservable(): Observable<Usuario[]>{
    return this.userListSubject.asObservable();
  }
}
