import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Play from "./components/Play"
import { v4 as uuid } from "uuid"
import Home from "./components/Home"
import { createContext, useEffect, useState } from "react"
import socket from "./io"
import { checkDraw, checkWin, getCords } from "./utils/boardActions"
import socketInitializer from "./io"
import { isUserLoggedIn, signIn } from "./auth/signIn"

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
    const [socket, setSocket] = useState(undefined)
    const [board, setBoard] = useState(initialBoard)
    const [player, setPlayer] = useState("X")
    const [winner, setWinner] = useState("")
    const [isDraw, setIsDraw] = useState(false)
    const [userInfo, setUserInfo] = useState(undefined)

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
    useEffect(() => {
        const init = async () => {
            await isUserLoggedIn(setUserInfo)
        }
        init()
    }, [])
    useEffect(() => {
        if (userInfo === null) {
            let user = signIn()
            setSocket(socketInitializer(user.email))
            setUserInfo(user)
        } else if (userInfo !== undefined) {
            console.log({ signedInUsr: userInfo })
            setSocket(socketInitializer(userInfo.email))
        }
    }, [userInfo])
    useEffect(() => {
        console.log({ socket })
    }, [socket])

    useEffect(() => {
        if (socket) {
            socket.on("isOnline", (socketId) => {
                socket.emit("isOnlineResponse", { socketId, status: true })
            })
            socket.on("recive_broadcast_message", (data) => {
                let brd = [...board]
                const { row, col } = getCords(data.id)
                brd[row][col]["marked"] = data.player
                setBoard(brd)
                console.log(data)
                setTimeout(() => {
                    setPlayer(data.player === "X" ? "O" : "X")
                    setIsDraw(checkDraw(board))
                    setWinner(checkWin(board, data.player))
                }, 50)
            })
            socket.on("userJoined", (data) => {
                console.log(data)
            })
        }
    }, [])
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
                    socket,
                    setSocket,
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
