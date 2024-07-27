import React, { useState } from "react"
import Layout from "./Layout"

function Board() {
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ])
    const [turn, setTurn] = useState("")

    return (
        <Layout>
            <div className="bg-darkpurple p-12 rounded-lg shadow-lg shadow-purplehover flex flex-col gap-9">
                <div className="grid grid-cols-3 gap-2">
                    <div className="player-card bg-skyblue">
                        <span>Player X</span>
                        <span>0</span>
                    </div>
                    <div className="player-card bg-lightblue">
                        <span>Draw</span>
                        <span>0</span>
                    </div>
                    <div className="player-card  bg-yellow">
                        <span>Player O</span>
                        <span>0</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                    {board.map((row, i) =>
                        row.map((cell, j) => (
                            <div
                                key={i + j}
                                className="cell bg-lightpurple text-white flex items-center justify-center text-4xl hover:bg-purplehover"
                            >
                                {cell}
                            </div>
                        ))
                    )}
                </div>
                <div>
                    {turn !== '' && <div className={`${turn === 'x' ? 'bg-skyblue' : 'bg-yellow'} text-black p-2 w-full rounded-md items-center font-bold`}>{turn} turn</div>}
                    <button className="bg-gray text-black p-2 w-full rounded-md font-bold">New Game</button>
                </div>
            </div>
        </Layout>
    )
}

export default Board
