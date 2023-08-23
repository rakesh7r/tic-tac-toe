import React from "react"
import Cell from "./Cell"

function Board() {
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
                        <Cell id="1" />
                        <Cell id="2" />
                        <Cell id="3" />
                        <Cell id="4" />
                        <Cell id="5" />
                        <Cell id="6" />
                        <Cell id="7" />
                        <Cell id="8" />
                        <Cell id="9" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Board
