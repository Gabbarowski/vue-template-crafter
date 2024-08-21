import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";

export class Label extends AbstractItemElement {
    message = ""

    constructor() {
        super();
        this.cssClassesItem.addClass(this.getStyleSettings().cssDefaultClass.label)
    }

    addMessage(message:string) {
        this.message = message
    }

    setMessage(message:string) {
        this.addMessage(message)
    }

}