"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const GameHandler_1 = require("./GameHandler");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const gameHandler = new GameHandler_1.GameHandler();
wss.on("connection", (ws) => {
    ws.on("error", console.error);
    gameHandler.actionHandler(ws);
    ws.on("disconnect", () => gameHandler.removeUser(ws));
});
