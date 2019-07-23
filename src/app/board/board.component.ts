import { Component, OnInit} from '@angular/core';
import { GameService } from '../game.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.sass'],
  animations: [
    trigger('divState', [
      state('initial', style({
        transform: 'translateY(0px)'
      })),
      transition('initial <=> final', animate(300, keyframes([
        style({
          transform: 'translateY(5px)'
        }),
        style({
          transform: 'translateY(-5px)'
        }),
        style({
          transform: 'translateY(3px)'
        }),
        style({
          transform: 'translateY(-3px)'
        }),
        style({
          transform: 'translateY(2px)'
        })
      ]))),
      state('final', style({
        transform: 'translateY(0px)'
      })),
    ])
  ]
})

export class BoardComponent implements OnInit {

    state = 'initial';
    board: number[][];

    constructor(public gameservice: GameService) {}

    ngOnInit() {
      this.board = this.gameservice.board;
    }

    onAnimate() {
      this.state === 'initial' ? this.state = 'final' : this.state = 'initial';
    }

    isValidColumn(board: number[][], col: number) {
      return board[0][col] === 0;
    }

    nextOpenRow(board: number[][], col: number) {
      for ( let i = this.gameservice.rowNumber - 1 ; i > -1; i--) {
        if (board[i][col] === 0) {
          return i;
        }
      }
    }

    checkWin(board: number[][], player: number) {

          // horizontal
          for ( let c = 0; c < this.gameservice.columnNumber - 3; c ++) {
              for ( let l = 0; l < this.gameservice.rowNumber; l++) {
                if (board[l][c] === player && board[l][c + 1] === player && board[l][c + 2] === player && board[l][c + 3] === player ) {
                  return true;
                }
              }
          }
          // vertical
          for ( let c = 0; c < this.gameservice.columnNumber; c ++) {
            for ( let l = 0; l < this.gameservice.rowNumber - 3; l++) {
              if (board[l][c] === player && board[l + 1][c] === player && board[l + 2][c ] === player && board[l + 3][c] === player ) {
                return true;
              }
            }
        }

        // + diagonals
          for ( let c = 0; c < this.gameservice.columnNumber - 3; c ++) {
          for ( let l = 0; l < this.gameservice.rowNumber - 3; l++) {
            if (board[l][c] === player && board[l + 1][c + 1] === player && board[l + 2][c + 2] === player
              && board[l + 3][c + 3] === player ) {
              return true;
            }
          }
      }

        // - diagonals
          for ( let c = 0; c < this.gameservice.columnNumber - 3; c ++) {
          for ( let l = 3; l < this.gameservice.rowNumber; l++) {
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
      // if first row is empty
      if (this.isValidColumn(this.board, c)) {
        this.gameservice.counter = this.gameservice.counter  + 1;
        // write on the lowest row
        const r: number = this.nextOpenRow(this.board, c);
        this.board[r][c] = this.gameservice.player;
        // animate
        this.onAnimate();
        // check winner
        if (this.checkWin(this.board, this.gameservice.player)) {
          this.gameservice.win = true;
          this.gameservice.openDialog(`Player ${this.gameservice.player} wins !!!`);
        }
        // switch players
        this.gameservice.player = (this.gameservice.player === 1) ? 2 : 1;

        }
        // no winner when board is full
      if ( this.gameservice.counter  === (this.gameservice.columnNumber * this.gameservice.rowNumber) && this.gameservice.win === false) {
          this.gameservice.openDialog('Draw !!!');
        }

      return;
    }

  }


