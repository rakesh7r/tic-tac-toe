import React, { useContext, useState } from "react"
import Cell from "./Cell"
import { markCell } from "../utils/boardActions"
import { GameContext } from "../App"

function Board() {
    const { board } = useContext(GameContext)
    const [id, setId] = useState(0)
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-4 shadow-md rounded-md grid grid-cols-3 gap-4">
                <div className="col-span-1 text-center">
                    <div className="font-semibold text-lg mb-2">Player X</div>
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        X
                    </div>
                </div>
                <div className="col-span-1 text-center">
                    <div className="font-semibold text-lg mb-2">Player O</div>
                    <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                        O
                    </div>
                </div>
                <div className="col-span-1">
                    <div className="grid grid-cols-3 gap-2">
                        {board.map((row) =>
                            row.map(({ id, marked }) => {
                                return <Cell id={id} key={id} marked={marked} />
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board
