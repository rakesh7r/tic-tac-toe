import React from "react"
import Board from "./Board"
import useSocket from "./Board/hooks/useSocket"

interface SocketContextProps {
    socket: WebSocket
    response: string
}

export const SocketContext = React.createContext<SocketContextProps | null>(null)
function App() {
    const [socket, response] = useSocket()
    return (
        <SocketContext.Provider value={{ socket, response }}>
            <Board />
        </SocketContext.Provider>
    )
}

export default App
