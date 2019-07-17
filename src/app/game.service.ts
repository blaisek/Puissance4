import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import { MessageComponent } from './message/message.component';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  board = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0]
  ];
  constructor( public dialog: MatDialog) {
   }

  async openDialog(data): Promise<void> {

    const dialogRef = this.dialog.open( MessageComponent, {
      data
    });
    // wait box close
    await dialogRef.afterClosed().toPromise().catch(err => err);
    // reset
    for (let i = 0; i < 6; i++) {
        this.board[i] = [0, 0, 0, 0, 0, 0, 0];
    }

  }
}
