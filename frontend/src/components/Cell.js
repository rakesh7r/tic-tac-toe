import React, { useContext } from "react"
import socket from "../io"
import { GameContext } from "../App"
import { markCell } from "../utils/boardActions"

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
    } = useContext(GameContext)
    return (
        <div
            id="1"
            onClick={() => {
                console.log({ marked, id })
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
                socket.emit("mark", {
                    id,
                })
            }}
            className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center text-gray-600 font-bold text-2xl"
        >
            {marked}
        </div>
    )
}

export default Cell
