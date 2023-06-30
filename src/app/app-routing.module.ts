import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './features/room/lobby/lobby.component';
import { RoomComponent } from './features/room/room.component';
import { BingoRoomComponent } from './features/room/bingo-room/bingo-room.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'lobby', component: LobbyComponent},
  {path: 'room', component: RoomComponent},
  {path: 'principal', component: BingoRoomComponent},
  {path: 'register', component: RegisterComponent},
  {
    path: '', redirectTo: '/principal', pathMatch: 'full'
  },
  {
    path: 'bingo_room',
    loadChildren: () =>
      import('./features/room/room.module').then((m) => m.RoomModule),
  },
  {
    path: '**', redirectTo: '/login', pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
