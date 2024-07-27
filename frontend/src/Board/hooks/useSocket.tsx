import { useEffect, useMemo, useState } from "react"

export default function useSocket(): [WebSocket, string] {
    const socket = useMemo(() => new WebSocket(process.env.REACT_APP_WS_URL as string), [])
    const [response, setResponse] = useState<string>("")

    useEffect(() => {
        socket.onmessage = (event: MessageEvent) => {
            setResponse(event.data)
        }
        return () => socket.close()
    }, [socket])

    return [socket, response]
}
