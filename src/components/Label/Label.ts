import {v4} from "uuid";
import {BodyTemplateItem} from "../Utility/Interfaces.ts";
import {FlexSizeManager} from "../Utility/FlexSizeManager.ts";

export class Label implements BodyTemplateItem{
    message = ""
    uuid = v4()
    flexSize = new FlexSizeManager()
    addMessage(message:string) {
        this.message = message
    }
}