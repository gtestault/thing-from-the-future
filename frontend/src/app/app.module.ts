import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CardComponent} from './components/card/card.component';
import {PlayfieldComponent} from './pages/playfield/playfield.component';
import {PlayerOverviewComponent} from './components/player-overview/player-overview.component';
import {PlayersCardsComponent} from './components/players-cards/players-cards.component';
import {CardFieldComponent} from './components/card-field/card-field.component';
import {TurnIndicatorComponent} from './components/turn-indicator/turn-indicator.component';
import {EmptyCardSpacesComponent} from './components/empty-card-spaces/empty-card-spaces.component';
import {UsernameSelectionComponent} from './pages/username-selection/username-selection.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RoomSelectionComponent} from './pages/room-selection/room-selection.component';
import {MatDialogModule} from "@angular/material/dialog";
import { JoinRoomDialogComponent } from './components/join-room-dialog/join-room-dialog.component';
import { WaitingRoomComponent } from './pages/waiting-room/waiting-room.component';
import {MatListModule} from "@angular/material/list";
import { PlayerConnectionStatusComponent } from './components/player-connection-status/player-connection-status.component';
import {MatIconModule} from "@angular/material/icon";
import { InvitePlayersDialogComponent } from './components/invite-players-dialog/invite-players-dialog.component';
import {ClipboardModule} from "@angular/cdk/clipboard";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { SwapCardsButtonComponent } from './components/swap-cards-button/swap-cards-button.component';
import {BrainstormComponent} from "./pages/brainstorm/brainstorm.component";
import { DrawBoardComponent } from './components/draw-board/draw-board.component';
import { ExitRoomButtonComponent } from './components/exit-room-button/exit-room-button.component';
import { VotingComponent } from './pages/voting/voting.component';
import { VotingCardComponent } from './components/voting-card/voting-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayfieldComponent,
    PlayerOverviewComponent,
    PlayersCardsComponent,
    CardFieldComponent,
    TurnIndicatorComponent,
    EmptyCardSpacesComponent,
    UsernameSelectionComponent,
    RoomSelectionComponent,
    JoinRoomDialogComponent,
    WaitingRoomComponent,
    PlayerConnectionStatusComponent,
    InvitePlayersDialogComponent,
    SwapCardsButtonComponent,
    BrainstormComponent,
    DrawBoardComponent,
    ExitRoomButtonComponent,
    VotingComponent,
    VotingCardComponent,
  ],
  imports: [
    MatIconModule,
    MatDialogModule,
    MatListModule,
    ClipboardModule,
    MatSnackBarModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
