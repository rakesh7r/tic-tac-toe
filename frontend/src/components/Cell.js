import React, { useContext } from "react"
import { GameContext } from "../App"
import { markCell } from "../utils/boardActions"
import { useParams } from "react-router-dom"

function Cell({ id, marked = "" }) {
    const {
        board,
        setPlayer,
        setBoard,
        player,
        setWinner,
        setIsDraw,
        winner,
        isDraw,
        socket
    } = useContext(GameContext)
    const { roomId } = useParams()
    return (
        <div
            id={id}
            onClick={() => {
                markCell({
                    board,
                    id,
                    player,
                    setBoard,
                    setPlayer,
                    setWinner,
                    setIsDraw,
                    winner,
                    isDraw,
                })
                socket.emit("send_broadcast_message", roomId, {
                    id,
                    player,
                })
            }}
            className="w-20 h-20 bg-gray-300 rounded-md flex items-center justify-center text-gray-600 font-bold text-2xl"
        >
            {marked}
        </div>
    )
}

export default Cell
