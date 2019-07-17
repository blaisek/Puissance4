import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material';
import { MessageComponent } from './message/message.component';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  columnNumber = 7;
  rowNumber = 6;

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

  async openDialog(data: string): Promise<void> {

    const dialogRef = this.dialog.open( MessageComponent, {
      data
    });
    // wait box close
    await dialogRef.afterClosed().toPromise().catch(err => err);
    // reset
    for (let i = 0; i < this.rowNumber; i++) {
        this.board[i] = [0, 0, 0, 0, 0, 0, 0];
    }

  }
}
