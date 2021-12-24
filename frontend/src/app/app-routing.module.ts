import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsernameSelectionComponent} from "./pages/username-selection/username-selection.component";
import {PlayfieldComponent} from "./pages/playfield/playfield.component";
import {PlayerRegisteredGuard} from "./guards/player-registered.guard";
import {WaitingRoomComponent} from "./pages/waiting-room/waiting-room.component";
import {PLAYFIELD_PATH, WAITING_ROOM_PATH} from "./routes";


const routes: Routes = [
  {path: '', component: UsernameSelectionComponent},
  {path: WAITING_ROOM_PATH, component: WaitingRoomComponent, canActivate: [PlayerRegisteredGuard]},
  {path: PLAYFIELD_PATH, component: PlayfieldComponent, canActivate: [PlayerRegisteredGuard]},
  {path: '**', component: UsernameSelectionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
