import { WebSocket } from "ws"
import { Game } from "./Game"
export class GameHandler {
    public pendingUser: WebSocket | null = null
    public games: Game[] = []

    public constructor() {}

    public addUser(user: WebSocket) {
        if (this.pendingUser === null) {
            this.pendingUser = user
            user.send(JSON.stringify({ type: "waiting", payload: "Waiting for opponent" }))
        } else {
            const game = new Game(this.pendingUser, user)
            this.games.push(game)
            this.pendingUser.send(JSON.stringify({ type: "game_started", message: "Game started", symbol: "X" }))
            this.pendingUser = null
            user.send(JSON.stringify({ type: "game_started", message: "Game started", symbol: "O" }))
        }
    }
    public removeUser(user: WebSocket) {
        if (this.pendingUser === user) {
            this.pendingUser = null
        } else {
            const game = this.games.find((game) => game.user1 === user || game.user2 === user)
            if (game) {
                this.games = this.games.filter((game) => game !== game)
                const opponent = game.user1 === user ? game.user2 : game.user1
                opponent.send(JSON.stringify({ type: "opponent_left", message: "Opponent left the game" }))
            }
        }
    }
    public makeMove(user: WebSocket, move: { x: number; y: number }) {
        const game = this.games.find((game) => game.user1 === user || game.user2 === user)
        console.log("board", game?.board)
        if (game) {
            console.log("making move", move)
            game.makeMove(move.x, move.y, user)
            const opponent = game.user1 === user ? game.user2 : game.user1
            opponent.send(JSON.stringify({ type: "update_board", payload: game.getBoard() }))
        }
    }
    public restart(user: WebSocket) {
        const game = this.games.find((game) => game.user1 === user || game.user2 === user)
        if (game) {
            game.restart()
            const opponent = game.user1 === user ? game.user2 : game.user1
            opponent.send(JSON.stringify({ type: "update_board", payload: game.getBoard() }))
        }
    }

    public actionHandler(user: WebSocket) {
        user.on("message", (message) => {
            console.log(message.toString())
            const data = JSON.parse(message.toString())
            if (data.type === "init_game") {
                this.addUser(user)
            } else if (data.type === "make_move") {
                this.makeMove(user, data.move)
            } else if (data.type === "restart") {
                this.restart(user)
            } else {
                console.error("Invalid action")
            }
        })
    }
}
