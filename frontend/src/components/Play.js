import React, { useContext, useEffect, useState } from "react"
import Board from "./Board"
import { useParams } from "react-router-dom"
import { GameContext } from "../App"

function Play() {
    const { roomId } = useParams()
    const { username, socket } = useContext(GameContext)
    const [turn, setTurn] = useState("O")
    const createRoom = () => {}
    const [hasJoined, setHasJoined] = useState(false)
    useEffect(() => {
        if (!hasJoined) {
            socket.emit("joinRoom", roomId, (acknowledgmentMessage) => {
                console.log(acknowledgmentMessage) // Handle the acknowledgment message from the server
            })
            setHasJoined((prevState) => !prevState)
        }
    }, [])
    return (
        <div className="App">
            <Board />
        </div>
    )
}

export default Play
