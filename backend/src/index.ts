import express from "express"
import http from "http"
import WebSocket, { Server as WebSocketServer } from "ws"
import { GameHandler } from "./GameHandler"
import cors from "cors"

const app = express()
app.use(cors())
const server = http.createServer(app)
const wss = new WebSocketServer({ server })
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
app.get("/", (req, res) => {
    res.send("App is up and running")
})
// Start the server
const PORT = process.env.PORT || 80
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})
