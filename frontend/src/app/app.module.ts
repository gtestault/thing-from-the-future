import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './components/card/card.component';
import { PlayfieldComponent } from './pages/playfield/playfield.component';
import { PlayerOverviewComponent } from './components/player-overview/player-overview.component';
import { PlayersCardsComponent } from './components/players-cards/players-cards.component';
import { CardFieldComponent } from './components/card-field/card-field.component';
import { TurnIndicatorComponent } from './components/turn-indicator/turn-indicator.component';
import { EmptyCardSpaceComponent } from './components/empty-card-space/empty-card-space.component';
import { EmptyCardSpacesComponent } from './components/empty-card-spaces/empty-card-spaces.component';
import { UsernameSelectionComponent } from './components/username-selection/username-selection.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayfieldComponent,
    PlayerOverviewComponent,
    PlayersCardsComponent,
    CardFieldComponent,
    TurnIndicatorComponent,
    EmptyCardSpaceComponent,
    EmptyCardSpacesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
