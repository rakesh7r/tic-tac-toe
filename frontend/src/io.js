import io from "socket.io-client"

const socketInitializer = (username) => {
    const socket = io.connect("http://localhost:5000", {
        query: { userId: username },
    })
    return socket
}

export default socketInitializer
