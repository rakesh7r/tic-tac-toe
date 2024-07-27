"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const GameHandler_1 = require("./GameHandler");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const server = http_1.default.createServer(app);
const wss = new ws_1.Server({ server });
const gameHandler = new GameHandler_1.GameHandler();
wss.on("connection", (ws) => {
    ws.on("error", console.error);
    gameHandler.actionHandler(ws);
    console.log("New connection");
    ws.on("close", () => {
        console.log("Connection closed");
        gameHandler.removeUser(ws);
    });
});
app.get("/", (req, res) => {
    res.send("App is up and running");
});
// Start the server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
