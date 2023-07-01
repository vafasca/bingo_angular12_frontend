import { Injectable } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  //users!: Usuario;
  private userListSubject: BehaviorSubject<Usuario | null> = new BehaviorSubject<Usuario | null>(null);
  private cookieName = 'user';

  constructor(private cookieService: CookieService) {
    //this.userListSubject = new BehaviorSubject<Usuario>(this.users);
    const storedUser = this.cookieService.get(this.cookieName);
    if(storedUser){
      this.userListSubject.next(JSON.parse(storedUser));
    }
   }

  nexts(user: Usuario): void{
    //this.users = user;
    //this.userListSubject.next(this.users);
    this.userListSubject.next(user);
    this.cookieService.set(this.cookieName, JSON.stringify(user));
    console.log("actualizado");
  }

  clearUser(): void {
    this.userListSubject.next(null);
    this.cookieService.delete(this.cookieName);
  }

  asObservable(): Observable<Usuario | null>{
    return this.userListSubject.asObservable();
  }
}
