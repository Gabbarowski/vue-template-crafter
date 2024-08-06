import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";

export class Label extends AbstractItemElement {
    message = ""

    addMessage(message:string) {
        this.message = message
    }

}