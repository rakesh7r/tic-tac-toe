import { WebSocketServer, WebSocket } from "ws"
import { GameHandler } from "./GameHandler"
import { userActions } from "./actions.const"

const wss = new WebSocketServer({ port: 8080 })
const gameHandler = new GameHandler()

wss.on("connection", (ws: WebSocket) => {
    ws.on("error", console.error)
    gameHandler.actionHandler(ws)
    console.log("New connection")
    ws.on("close", () => {
        console.log("Connection closed")
        gameHandler.removeUser(ws)
    })
})
