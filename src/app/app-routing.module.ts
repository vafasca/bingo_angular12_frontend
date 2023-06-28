import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LobbyComponent } from './features/room/lobby/lobby.component';
import { RoomComponent } from './features/room/room.component';
import { BingoRoomComponent } from './features/room/bingo-room/bingo-room.component';

const routes: Routes = [
  {path: 'lobby', component: LobbyComponent},
  {path: 'room', component: RoomComponent},
  {path: 'principal', component: BingoRoomComponent},
  {
    path: '', redirectTo: '/bingo_room', pathMatch: 'full'
  },
  {
    path: 'bingo_room',
    loadChildren: () =>
      import('./features/room/room.module').then((m) => m.RoomModule),
  },
  {
    path: '**', redirectTo: 'bingo_room', pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
