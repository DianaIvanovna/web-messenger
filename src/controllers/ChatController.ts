
import Store from "../store/Store";
import {dialogInterface} from "../store/type";

export default new class ChatController {
    public  openDialog (index: dialogInterface) {
        console.log("openDialog", index)
        Store.set("activeChat", index);
    }
} 