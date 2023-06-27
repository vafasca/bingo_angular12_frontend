import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomRoutingModule } from './room-routing.module';
import { RoomComponent } from './room.component';
import { LobbyComponent } from './lobby/lobby.component';
import { BingoRoomComponent } from './bingo-room/bingo-room.component';
import { BingoCardComponent } from './bingo-card/bingo-card.component';


@NgModule({
  declarations: [
    RoomComponent,
    LobbyComponent,
    BingoRoomComponent,
    BingoCardComponent
  ],
  imports: [
    CommonModule,
    RoomRoutingModule
  ]
})
export class RoomModule { }
