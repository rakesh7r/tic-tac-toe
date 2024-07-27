"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameHandler = void 0;
const Game_1 = require("./Game");
class GameHandler {
    constructor() {
        this.pendingUser = null;
        this.games = [];
    }
    addUser(user) {
        this.games = this.games.filter((game) => game.user1 !== user && game.user2 === user);
        if (this.pendingUser === null) {
            this.pendingUser = user;
            user.send(JSON.stringify({ type: "waiting", payload: "Waiting for opponent" }));
        }
        else {
            const game = new Game_1.Game(this.pendingUser, user);
            this.games.push(game);
            this.pendingUser.send(JSON.stringify({ type: "game_started", message: "Game started", symbol: "X" }));
            this.pendingUser = null;
            user.send(JSON.stringify({ type: "game_started", message: "Game started", symbol: "O" }));
        }
    }
    removeUser(user) {
        if (this.pendingUser === user) {
            this.pendingUser = null;
        }
        else {
            const game = this.games.find((game) => game.user1 === user || game.user2 === user);
            if (game) {
                this.games = this.games.filter((game) => game !== game);
                const opponent = game.user1 === user ? game.user2 : game.user1;
                opponent.send(JSON.stringify({ type: "opponent_left", message: "Opponent left the game" }));
            }
        }
    }
    makeMove(user, move) {
        const game = this.games.find((game) => game.user1 === user || game.user2 === user);
        if (game) {
            game.makeMove(move.x, move.y, user);
            const opponent = game.user1 === user ? game.user2 : game.user1;
            opponent.send(JSON.stringify({ type: "update_board", payload: game.getBoard() }));
            if (game.isDraw()) {
                game.user1.send(JSON.stringify({ type: "game_over", message: "Draw" }));
                game.user2.send(JSON.stringify({ type: "game_over", message: "Draw" }));
                return;
            }
            if (game.isGameOver()) {
                const winner = game.getWinner();
                const user1Won = winner === "X";
                game.user1.send(JSON.stringify({ type: "game_over", message: user1Won ? "You won" : "You lose", winner }));
                game.user2.send(JSON.stringify({ type: "game_over", message: !user1Won ? "You won" : "You lose", winner }));
                return;
            }
        }
    }
    restart(user) {
        const game = this.games.find((game) => game.user1 === user || game.user2 === user);
        if (game) {
            game.restart();
            const opponent = game.user1 === user ? game.user2 : game.user1;
            opponent.send(JSON.stringify({ type: "update_board", payload: game.getBoard() }));
            user.send(JSON.stringify({
                type: "restart",
                message: "Game restarted",
                symbol: user === game.user1 ? "X" : "O",
            }));
            opponent.send(JSON.stringify({
                type: "restart",
                message: "Game restarted",
                symbol: user === game.user1 ? "X" : "O",
            }));
        }
    }
    actionHandler(user) {
        user.on("message", (message) => {
            console.log(message.toString());
            const data = JSON.parse(message.toString());
            if (data.type === "init_game") {
                this.addUser(user);
            }
            else if (data.type === "make_move") {
                this.makeMove(user, data.move);
            }
            else if (data.type === "restart") {
                this.restart(user);
            }
            else {
                console.error("Invalid action");
            }
        });
    }
}
exports.GameHandler = GameHandler;
