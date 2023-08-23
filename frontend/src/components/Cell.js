import React from "react"
import socket from "../io"

function Cell({ id, marked = false }) {
    return (
        <div
            id="1"
            onClick={() => {
                socket.emit("mark", {
                    id,
                })
            }}
            className="w-16 h-16 bg-gray-300 rounded-md flex items-center justify-center text-gray-600 font-bold text-2xl"
        >
            {id}
        </div>
    )
}

export default Cell
