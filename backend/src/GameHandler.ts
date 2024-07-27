import { WebSocket } from "ws"
import { Game } from "./Game"
export class GameHandler {
    public pendingUser: WebSocket | null = null
    public games: Game[] = []

    public constructor() {}

    public addUser(user: WebSocket) {
        if (this.pendingUser === null) {
            this.pendingUser = user
            user.send(JSON.stringify({ type: "ack", payload: "Waiting for opponent" }))
        } else {
            const game = new Game(this.pendingUser, user)
            this.games.push(game)
            user.send(JSON.stringify({ type: "ack", payload: "Game started" }))
            this.pendingUser.send(JSON.stringify({ type: "ack", payload: "Game started" }))
            this.pendingUser = null
        }
    }
    public removeUser(user: WebSocket) {
        if (this.pendingUser === user) {
            this.pendingUser = null
        }
        const idx = this.games.findIndex((game: Game) => game.user1 === user || game.user2 === user)
        const activeUser = this.games[idx].user1 === user ? this.games[idx].user2 : this.games[idx].user1
        activeUser.send(JSON.stringify({ type: "ack", payload: "Game abandoned" }))
    }
    public makeMove(user: WebSocket, move: { x: number; y: number }) {
        const game = this.games.find((game) => game.user1 === user || game.user2 === user)
        if (game) {
            game.makeMove(move.x, move.y, user)
            const opponent = game.user1 === user ? game.user2 : game.user1
            opponent.send(JSON.stringify({ type: "update", payload: game.getBoard() }))
        }
    }
    public restart(user: WebSocket) {
        const game = this.games.find((game) => game.user1 === user || game.user2 === user)
        if (game) {
            game.restart()
            const opponent = game.user1 === user ? game.user2 : game.user1
            opponent.send(JSON.stringify({ type: "update", payload: game.getBoard() }))
        }
    }

    public actionHandler(user: WebSocket) {
        user.on("message", (message) => {
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
