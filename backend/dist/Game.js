"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor(user1, user2) {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        this.user1 = user1;
        this.user2 = user2;
    }
    makeMove(x, y, user) {
        if (this.user1 === user) {
            this.board[x][y] = "X";
        }
        else if (this.user2 === user) {
            this.board[x][y] = "O";
        }
    }
    getBoard() {
        return this.board;
    }
    restart() {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }
    isDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === "") {
                    return false;
                }
            }
        }
        return true;
    }
    isGameOver() {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] !== "" &&
                this.board[i][0] === this.board[i][1] &&
                this.board[i][0] === this.board[i][2]) {
                return true;
            }
        }
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (this.board[0][j] !== "" &&
                this.board[0][j] === this.board[1][j] &&
                this.board[0][j] === this.board[2][j]) {
                return true;
            }
        }
        // Check diagonals
        if (this.board[0][0] !== "" && this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2])
            return true;
        if (this.board[0][2] !== "" && this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0])
            return true;
        return false;
    }
}
exports.Game = Game;
