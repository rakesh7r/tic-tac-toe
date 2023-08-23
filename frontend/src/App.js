import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Play from "./components/Play"
import { v4 as uuid } from "uuid"
import Home from "./components/Home"

function App() {
    const roomId = uuid()
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path={`/room/:roomId`} element={<Play />} />
                </Routes>
            </Router>
        </div>
    )
}

export default App
