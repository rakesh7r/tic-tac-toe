import React, { useState } from "react"
import { Link } from "react-router-dom"
import { v4 as uuid } from "uuid"
import { useNavigate } from "react-router-dom"

function Home() {
    const roomId = uuid().slice(0,7)
    const [roomIdInput, setRoomIdInput] = useState("")

    const navigate = useNavigate()

    const joinRoom = () => {
        navigate(`/room/${roomIdInput}`)
    }
    return (
        <div className="flex justify-center align-center max-h-10">
            <p>
                <Link to={`/room/${roomId}`}>
                    <button>Create room</button>
                </Link>
                <div className="flex">
                    <hr />
                    <p>OR</p>
                    <hr />
                </div>
                <input
                    type="text"
                    id="roomIdInput"
                    placeholder="room-id"
                    value={roomIdInput}
                    onChange={(e) => setRoomIdInput(e.target.value)}
                    className="form-control border-cyan-50"
                />
                <button
                    onClick={() => {
                        joinRoom()
                    }}
                >
                    join
                </button>
            </p>
        </div>
    )
}

export default Home
