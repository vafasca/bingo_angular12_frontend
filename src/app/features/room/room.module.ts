import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { LobbyComponent } from './lobby/lobby.component';
import { BingoRoomComponent } from './bingo-room/bingo-room.component';
import { BingoCardComponent } from './bingo-card/bingo-card.component';
import { UserListComponent } from './user-list/user-list.component';
import { BalotaListComponent } from './balota-list/balota-list.component';


@NgModule({
  declarations: [
    RoomComponent,
    LobbyComponent,
    BingoRoomComponent,
    BingoCardComponent,
    UserListComponent,
    BalotaListComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule
  ]
})
export class RoomModule { }
