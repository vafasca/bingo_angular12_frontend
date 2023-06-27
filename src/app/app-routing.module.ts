import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', redirectTo: '/room', pathMatch: 'full'
  },
  {
    path: 'room',
    loadChildren: () =>
      import('./features/room/room.module').then((m) => m.RoomModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
