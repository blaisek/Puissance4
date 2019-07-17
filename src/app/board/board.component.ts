import { Component, OnInit} from '@angular/core';
import { GameService } from '../game.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass'],
  animations: [
    // animation triggers go here
  ]
})

export class BoardComponent implements OnInit {

    columnNumber = 7;
    lineNumber = 6;
    player = 1;
    counter = 0;
    win = false;
    board: number[][];

    constructor(public gameservice: GameService) {}

    ngOnInit() {
      this.board = this.gameservice.board;
    }

    isValidColumn(board: number[][], col: number) {
      return board[0][col] === 0;
    }

    nextOpenRow(board: number[][], col: number) {
      for ( let i = this.lineNumber - 1 ; i > -1; i--) {
        if (board[i][col] === 0) {
          return i;
        }
      }
    }

    checkWin(board: number[][], player: number) {

          // horizontal
          for ( let c = 0; c < this.columnNumber - 3; c ++) {
              for ( let l = 0; l < this.lineNumber; l++) {
                if (board[l][c] === player && board[l][c + 1] === player && board[l][c + 2] === player && board[l][c + 3] === player ) {
                  return true;
                }
              }
          }
          // vertical
          for ( let c = 0; c < this.columnNumber; c ++) {
            for ( let l = 0; l < this.lineNumber - 3; l++) {
              if (board[l][c] === player && board[l + 1][c] === player && board[l + 2][c ] === player && board[l + 3][c] === player ) {
                return true;
              }
            }
        }

        // + diagonals
          for ( let c = 0; c < this.columnNumber - 3; c ++) {
          for ( let l = 0; l < this.lineNumber - 3; l++) {
            if (board[l][c] === player && board[l + 1][c + 1] === player && board[l + 2][c + 2] === player
              && board[l + 3][c + 3] === player ) {
              return true;
            }
          }
      }

        // - diagonals
          for ( let c = 0; c < this.columnNumber - 3; c ++) {
          for ( let l = 3; l < this.lineNumber; l++) {
            if (board[l][c] === player && board[l - 1][c + 1] === player && board[l - 2][c + 2] === player
              && board[l - 3][c + 3] === player ) {
              return true;
            }
          }
      }

    }

    game(event) {

      // index column
      const c = event.target.getAttribute('data-c');
      // if first row isn't empty
      if (this.isValidColumn(this.board, c)) {
        this.counter = this.counter + 1;
        // write on the lowest row
        const i: number = this.nextOpenRow(this.board, c);
        this.board[i][c] = this.player;
        if (this.checkWin(this.board, this.player)) {
          this.win = true;
          this.gameservice.openDialog(`Player ${this.player} wins !!!`);
        }
        // switch players
        this.player = (this.player === 1) ? 2 : 1;
        }
        // no winner when board is full
      if ( this.counter === 42 && this.win === false) {
          this.gameservice.openDialog('Draw !!!');
        }

      return;
    }

  }


