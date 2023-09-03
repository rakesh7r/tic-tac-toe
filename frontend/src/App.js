import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Play from "./components/Play"
import { v4 as uuid } from "uuid"
import Home from "./components/Home"
import { createContext, useEffect, useState } from "react"

export const GameContext = createContext()

function App() {
    const roomId = uuid()
    const initialBoard = [
        [
            { marked: "", id: 1 },
            { marked: "", id: 2 },
            { marked: "", id: 3 },
        ],
        [
            { marked: "", id: 4 },
            { marked: "", id: 5 },
            { marked: "", id: 6 },
        ],
        [
            { marked: "", id: 7 },
            { marked: "", id: 8 },
            { marked: "", id: 9 },
        ],
    ]
    const [board, setBoard] = useState(initialBoard)
    const [player, setPlayer] = useState("X")
    const [winner, setWinner] = useState("")
    const [isDraw, setIsDraw] = useState(false)

    useEffect(() => {
        if (isDraw) {
            window.alert("It's a draw!")
            setBoard(initialBoard)
            setPlayer("X")
            setWinner("")
            setIsDraw(false)
        } else if (winner !== "") {
            alert(`${winner} wins`)
            setBoard(initialBoard)
            setPlayer("X")
            setWinner("")
            setIsDraw(false)
        }
    }, [isDraw, winner])
    return (
        <div>
            <GameContext.Provider
                value={{
                    board,
                    setBoard,
                    player,
                    setPlayer,
                    winner,
                    setWinner,
                    isDraw,
                    setIsDraw,
                }}
            >
                <Router>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path={`/room/:roomId`} element={<Play />} />
                    </Routes>
                </Router>
            </GameContext.Provider>
        </div>
    )
}

export default App
