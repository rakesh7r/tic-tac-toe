import { WebSocket } from "ws"

export class Game {
    public user1: WebSocket
    public user2: WebSocket
    public board: string[][]

    public constructor(user1: WebSocket, user2: WebSocket) {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]
        this.user1 = user1
        this.user2 = user2
    }
    public makeMove(x: number, y: number, user: WebSocket) {
        if (this.user1 === user) {
            this.board[x][y] = "X"
        } else if (this.user2 === user) {
            this.board[x][y] = "O"
        }
    }
    public getBoard() {
        return this.board
    }
    public restart() {
        this.board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ]
    }
    public isDraw() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.board[i][j] === "") {
                    return false
                }
            }
        }
        return true
    }
    public getWinner() {
        // check rows for X and O
        for (let i = 0; i < 3; i++) {
            if (this.board[i][0] === "X" && this.board[i][1] === "X" && this.board[i][2] === "X") {
                return "X"
            }
            if (this.board[i][0] === "O" && this.board[i][1] === "O" && this.board[i][2] === "O") {
                return "O"
            }
        }
        // check columns for X and O
        for (let j = 0; j < 3; j++) {
            if (this.board[0][j] === "X" && this.board[1][j] === "X" && this.board[2][j] === "X") {
                return "X"
            }
            if (this.board[0][j] === "O" && this.board[1][j] === "O" && this.board[2][j] === "O") {
                return "O"
            }
        }
        // check diagonals for X and O
        if (this.board[0][0] === "X" && this.board[1][1] === "X" && this.board[2][2] === "X") {
            return "X"
        }
        if (this.board[0][0] === "O" && this.board[1][1] === "O" && this.board[2][2] === "O") {
            return "O"
        }
    }
    public isGameOver() {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (
                this.board[i][0] !== "" &&
                this.board[i][0] === this.board[i][1] &&
                this.board[i][0] === this.board[i][2]
            ) {
                return true
            }
        }
        // Check columns
        for (let j = 0; j < 3; j++) {
            if (
                this.board[0][j] !== "" &&
                this.board[0][j] === this.board[1][j] &&
                this.board[0][j] === this.board[2][j]
            ) {
                return true
            }
        }
        // Check diagonals
        if (this.board[0][0] !== "" && this.board[0][0] === this.board[1][1] && this.board[0][0] === this.board[2][2])
            return true

        if (this.board[0][2] !== "" && this.board[0][2] === this.board[1][1] && this.board[0][2] === this.board[2][0])
            return true
        return false
    }
}
