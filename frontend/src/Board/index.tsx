import React, { useState } from "react"
import Layout from "./Layout"
import { SocketContext } from "../App"

function Board() {
    const socket = React.useContext(SocketContext)?.socket
    const response = React.useContext(SocketContext)?.response
    const [waiting, setWaiting] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [board, setBoard] = useState([
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ])
    const [symbol, setSymbol] = useState("")
    const [turn, setTurn] = useState("")

    const newGame = () => {
        setBoard([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ])
        setSymbol("")
        setTurn("")
        socket?.send(JSON.stringify({ type: "init_game" }))
    }
    const toggleTurn = () => {
        setTurn((prevTurn) => (prevTurn === "X" ? "O" : "X"))
    }
    React.useEffect(() => {
        if (response) {
            const data = JSON.parse(response)
            if (data.type === "waiting") {
                setWaiting(true)
            } else if (data.type === "game_started") {
                setWaiting(false)
                setGameStarted(true)
                setSymbol(data.symbol)
                setTurn("X")
            } else if (data.type === "update_board") {
                console.log(data)
                setBoard(data.payload)
                toggleTurn()
            } else if (data.type === "opponent_left") {
                setGameStarted(false)
                setWaiting(false)
            }
        }
    }, [response])
    console.log(response)

    const makeMove = (x: number, y: number) => {
        if (board[x][y] === "" && turn === symbol) {
            const newBoard = [...board]
            newBoard[x][y] = symbol
            setBoard(newBoard)
            setTurn(turn === "X" ? "O" : "X")
            socket?.send(JSON.stringify({ type: "make_move", move: { x, y } }))
        }
    }

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
                                onClick={() => {
                                    makeMove(i, j)
                                }}
                            >
                                {cell}
                            </div>
                        ))
                    )}
                </div>
                <div>
                    {gameStarted && (
                        <div
                            className={`btn flex flex-row justify-center ${turn === "X" ? "bg-skyblue" : "bg-yellow"} `}
                        >
                            {turn} turn
                        </div>
                    )}
                    {!gameStarted && (
                        <button className="bg-gray btn" onClick={() => newGame()}>
                            {!waiting ? <p>New Game</p> : "Waiting for opponent"}
                        </button>
                    )}
                </div>
            </div>
        </Layout>
    )
}

export default Board
