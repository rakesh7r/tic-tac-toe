const app = require("express")()
const cors = require("cors")
app.use(cors())
const server = require("http").createServer(app)
const { Server } = require("socket.io")
require("dotenv").config()

const io = new Server(server, {
    cors: {
        // current client port is 3001 change it back when needed
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
    },
})

io.on("connection", async (socket) => {
    console.log("User Connected : ", socket.id)
    console.log("userID : " + socket.handshake.query.userId)

    const sockets = await io.fetchSockets()
    socket.on("mark", (data) => {
        console.log(data)
    })
    // console.log(sockets)
    socket.on("send_broadcast_message", (data) => {
        console.log(data)
        socket.broadcast.emit("recive_broadcast_message", data.message)
    })

    socket.on("joinRoom", (data) => {
        socket.join(data.room)
        console.log(`user ${socket.id} joined ${data.room}`)
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
