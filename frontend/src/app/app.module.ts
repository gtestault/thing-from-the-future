import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PlayfieldComponent } from './playfield/playfield.component';
import { PlayerOverviewComponent } from './player-overview/player-overview.component';
import { PlayersCardsComponent } from './players-cards/players-cards.component';
import { CardFieldComponent } from './card-field/card-field.component';
import { TurnIndicatorComponent } from './turn-indicator/turn-indicator.component';
import { EmptyCardSpaceComponent } from './empty-card-space/empty-card-space.component';
import { EmptyCardSpacesComponent } from './empty-card-spaces/empty-card-spaces.component';

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
