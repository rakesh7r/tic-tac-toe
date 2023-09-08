import React, { useContext } from "react"
import Cell from "./Cell"
import { GameContext } from "../App"

function Board() {
    const { board, player } = useContext(GameContext)
    return (
        <div className="bg-gray-100 flex items-center justify-center h-screen">
            <div className="bg-white p-4 shadow-md rounded-md grid grid-cols-2 gap-4">
                <div className="col-span-1 text-center">
                    <div className="font-semibold text-lg mb-2">Player X</div>
                    <div
                        className={`w-16 h-16  ${
                            player === "X"
                                ? "bg-blue-500 text-white"
                                : "text-gray-500"
                        } rounded-full flex items-center justify-center  font-bold text-2xl`}
                    >
                        X
                    </div>
                </div>
                <div className="col-span-1 text-center">
                    <div className="font-semibold text-lg mb-2">Player O</div>
                    <div
                        className={`w-16 h-16  ${
                            player === "O"
                                ? "bg-red-500 text-white"
                                : "text-gray-500"
                        }  rounded-full flex items-center justify-center  font-bold text-2xl`}
                    >
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
