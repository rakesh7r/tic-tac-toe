import React, { useContext, useState } from "react"
import Board from "./Board"
import { useParams } from "react-router-dom"
import { GameContext } from "../App"

function Play() {
    const { roomId } = useParams()
    const [turn, setTurn] = useState("O")
    const createRoom = () => {}
    const joinRoom = () => {}

    return (
        <div className="App">
            <Board />
        </div>
    )
}

export default Play
