import React, { useState } from "react"
import Layout from "./Layout"
import { SocketContext } from "../App"

function Board() {
    const socket = React.useContext(SocketContext)?.socket
    const response = React.useContext(SocketContext)?.response
    const [waiting, setWaiting] = useState(false)
    const [gameStarted, setGameStarted] = useState(false)
    const [gameOver, setGameOver] = useState(false)
    const [wins, setWins] = useState({ X: 0, O: 0, draw: 0 })
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
        setGameOver(false)
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
                setBoard(data.payload)
                toggleTurn()
            } else if (data.type === "opponent_left") {
                alert(data.message)
                setGameStarted(false)
                setWaiting(false)
            } else if (data.type === "game_over") {
                setGameStarted(false)
                setGameOver(true)
                alert(data.message)
                setWins((prevWins) => {
                    if (data.message === "Draw")
                        return {
                            ...prevWins,
                            draw: prevWins.draw + 1,
                        }
                    else if (data.winner === "X") {
                        return {
                            ...prevWins,
                            X: prevWins.X + 1,
                        }
                    } else
                        return {
                            ...prevWins,
                            O: prevWins.O + 1,
                        }
                })
            } else if (data.type === "restart") {
                setBoard([
                    ["", "", ""],
                    ["", "", ""],
                    ["", "", ""],
                ])
                setGameOver(false)
                setGameStarted(true)
                setTurn("X")
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
    const restart = () => {
        setGameOver(false)
        setGameStarted(true)
        socket?.send(JSON.stringify({ type: "restart" }))
    }
    return (
        <Layout>
            <div className="bg-darkpurple p-12 rounded-lg shadow-lg shadow-purplehover flex flex-col gap-9">
                <div className="w-full flex flex-row justify-center items-center">
                    {symbol && <span className="font-bold">You are {symbol}</span>}{" "}
                </div>
                <div className="grid grid-cols-3 gap-2">
                    <div className="player-card bg-skyblue">
                        <span>Player X</span>
                        <span>{wins.X}</span>
                    </div>
                    <div className="player-card bg-lightblue">
                        <span>Draw</span>
                        <span>{wins.draw}</span>
                    </div>
                    <div className="player-card  bg-yellow">
                        <span>Player O</span>
                        <span>{wins.O}</span>
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
                <div className="flex-col justify-center items-center gap-4">
                    {gameStarted && (
                        <div
                            className={`btn flex flex-row justify-center ${turn === "X" ? "bg-skyblue" : "bg-yellow"} `}
                        >
                            {turn} turn
                        </div>
                    )}
                    {gameOver && (
                        <button className="bg-gray btn mb-6" onClick={() => restart()}>
                            <p>Restart</p>
                        </button>
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
