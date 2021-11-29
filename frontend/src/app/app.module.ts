import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { PlayfieldComponent } from './playfield/playfield.component';
import { PlayerOverviewComponent } from './player-overview/player-overview.component';
import { CardFieldComponent } from './card-field/card-field.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    PlayfieldComponent,
    PlayerOverviewComponent,
    CardFieldComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
