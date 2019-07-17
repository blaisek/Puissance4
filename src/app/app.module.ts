import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatDialogModule} from '@angular/material';


import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { GameService } from './game.service';
import { MessageComponent } from './message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    MessageComponent,
  ],
  entryComponents: [MessageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
