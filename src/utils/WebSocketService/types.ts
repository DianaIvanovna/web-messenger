export type SocketItem = {
    chatId: number,
    token: string,
    userId:number,
    socket : WebSocket,
}
export type sendData= {
    content: string|number,
    type: string,
}
