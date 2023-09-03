export const getCords = (cell) => {
    cell -= 1
    let row = Math.floor(cell / 3)
    let col = Math.floor(cell % 3)
    return { row, col }
}
export const markCell = ({
    board,
    id,
    player,
    setBoard,
    setPlayer,
    setIsDraw,
    setWinner,
    winner,
    isDraw,
}) => {
    if (isDraw || winner) {
        return true
    }
    const { row, col } = getCords(id)
    if (
        board[row][col]["marked"] === "X" ||
        board[row][col]["marked"] === "O"
    ) {
        return
    } else {
        console.log(board)
        let brd = [...board]
        brd[row][col]["marked"] = player
        setBoard(brd)
        setTimeout(() => {
            setWinner(checkWin(brd, player))
            setIsDraw(checkDraw(brd))
            setPlayer((prevState) => (prevState === "X" ? "O" : "X"))
        }, 10)
    }
}

export const checkWin = (board, player) => {
    for (let i = 0; i < 3; i++) {
        if (
            board[i][0]["marked"] === player &&
            board[i][1]["marked"] === player &&
            board[i][2]["marked"] === player
        ) {
            return player
        }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
        if (
            board[0][i]["marked"] === player &&
            board[1][i]["marked"] === player &&
            board[2][i]["marked"] === player
        ) {
            return player
        }
    }

    // Check diagonals
    if (
        (board[0][0]["marked"] === player &&
            board[1][1]["marked"] === player &&
            board[2][2]["marked"] === player) ||
        (board[0][2]["marked"] === player &&
            board[1][1]["marked"] === player &&
            board[2][0]["marked"] === player)
    ) {
        return player
    }

    return "" // No winner
}

export const checkDraw = (board) => {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j]["marked"] === "") return false
        }
    }
    return true
}
