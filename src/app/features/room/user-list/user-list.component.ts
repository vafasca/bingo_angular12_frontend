import { Component, OnDestroy, OnInit } from '@angular/core';
import { Usuario } from '../interfaces/usuario.interface';
import { UserListService } from '../services/user-list.service';
import { Observable, Subject, interval, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit, OnDestroy {
  persona!: Usuario[];
  userLog!: Usuario;

  idUser!: number | null;
  cookieUser!: Usuario | null;
  idLobby!:number;
  private unsubscribe$: Subject<void> = new Subject<void>();
  
  constructor(
    private userListSvc: UserListService, 
    private cookieSvc: CookieService,
    private localStorageSvc: LocalStorageService) {}
  ngOnInit(): void {
     this.localStorageSvc.asObservable().subscribe((user: Usuario | null) => {
       if (user) {
         this.idUser = user.id;
         this.cookieUser = user;
         this.idLobby = user.lobbyId;
       } else {
         this.idUser = null;
         this.cookieUser = null;
          //Aquí puedes asignar un valor predeterminado si no hay usuario disponible
       }
     });

     interval(2000) // Emite un valor cada 2 segundos
     .pipe(
       switchMap(() => this.updateUserList()),
       takeUntil(this.unsubscribe$)
     )
     .subscribe((users: Usuario[]) => {
       this.persona = users.filter(user => (user.estadoLobby === true && user.lobbyId === this.idLobby));
     });
  }
  private updateUserList(): Observable<Usuario[]> {
    if (this.cookieUser) {
      return this.userListSvc.getUsers().pipe(
        map((users: Usuario[]) =>
          users.filter(user => user.estadoLobby === true && user.lobbyId === this.idLobby)
        )
      );
    } else {
      return of([]);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
