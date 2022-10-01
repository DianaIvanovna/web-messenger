import WebSocketService from "../utils/WebSocketService/WebSocketService";

const webSocketService = new WebSocketService();

class MessageController {
    public async sendMessange(chatId:number, messange:string) {
        webSocketService.send(chatId, {
            content: messange,
            type: 'message',
          })
    } 

    public async getOldMessages (chatId:number, shift = 0) {
        webSocketService.send(chatId, {
            content: shift,
            type: 'get old',  
        }) 
    } 

    public async closeSockets() {
        webSocketService.closeSockets() 
    }
}


export default new MessageController;