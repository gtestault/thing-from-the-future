import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsernameSelectionComponent} from './pages/username-selection/username-selection.component';
import {PlayfieldComponent} from './pages/playfield/playfield.component';
import {PlayerRegisteredGuard} from './guards/player-registered.guard';
import {RoomSelectionComponent} from './pages/room-selection/room-selection.component';
import {
  BRAINSTORM_PATH,
  PLAYFIELD_PATH,
  ROOM_SELECTION_PATH, WAITING_ROOM_JOIN_PATH,
  WAITING_ROOM_PATH,
  WAITING_ROOM_PATH_ROOM_ID_VARIABLE,
  VOTING_PATH, WINNER_ANNOUNCEMENT_PATH
} from './routes';
import {WaitingRoomComponent} from './pages/waiting-room/waiting-room.component';
import {BrainstormComponent} from "./pages/brainstorm/brainstorm.component";
import {VotingComponent} from './pages/voting/voting.component';
import {WinnerAnnouncementComponent} from "./pages/winner-announcement/winner-announcement.component";


const routes: Routes = [
  {path: '', component: UsernameSelectionComponent},
  {path: ROOM_SELECTION_PATH, component: RoomSelectionComponent, canActivate: [PlayerRegisteredGuard]},
  {path: PLAYFIELD_PATH, component: PlayfieldComponent, canActivate: [PlayerRegisteredGuard]},
  {path: WAITING_ROOM_JOIN_PATH, component: WaitingRoomComponent, canActivate: [PlayerRegisteredGuard]},
  {path: WAITING_ROOM_PATH, component: WaitingRoomComponent, canActivate: [PlayerRegisteredGuard]},
  {path: BRAINSTORM_PATH, component: BrainstormComponent, canActivate: [PlayerRegisteredGuard]},
  {path: VOTING_PATH, component: VotingComponent, canActivate: [PlayerRegisteredGuard]},
  {path: WINNER_ANNOUNCEMENT_PATH, component: WinnerAnnouncementComponent, canActivate: [PlayerRegisteredGuard]},
  {path: '**', component: UsernameSelectionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
