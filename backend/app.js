const app = require("express")()
const cors = require("cors")
app.use(cors())
const server = require("http").createServer(app)
const { Server } = require("socket.io")
require("dotenv").config()

const io = new Server(server, {
    cors: {
        // current client port is 3000 change it back when needed
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
})

let users = {}
let userMap = new Map()
let rooms = {}

io.on("connection", async (socket) => {
    // const sockets = await io.fetchSockets()
    const { userId } = socket.handshake.query
    const socketId = socket.id
    console.log({ userId, socketId })

    socket.on("joinRoom", (room) => {
        socket.join(room)
        console.log("================================================")
        if (!rooms[room]) {
            rooms[room] = new Map()
        }

        userMap.set(socketId, userId)
        userMap.forEach((value, key) => {
            io.to(key).emit("isOnline", key)
        })

        console.log(userMap)
        socket.on("isOnlineResponse", (response) => {
            console.log({ response })
        })

        socket.emit("userJoined", users)
    })
    socket.on("mark", (data) => {
        console.log(data)
    })
    // console.log(sockets)
    socket.on("send_broadcast_message", (roomId, data) => {
        console.log(data)
        socket
            .to(roomId)
            .emit("recive_broadcast_message", { ...data, ...users })
        console.log(users)
    })

    socket.on("sendMessage", (data) => {
        socket.to(data.room).emit("reciveMessage", data.message)
        // console.log(data)
    })
    socket.on("disconnect", (socket) => {
        console.log(`${socket.id} disconnected`)
    })
})

app.get("/", (req, res) => {
    res.send("hello")
})
server.listen(5000, () => {
    console.log("Server started on http://localhost:5000")
})
