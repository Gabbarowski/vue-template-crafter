import {v4} from "uuid";
import {BodyTemplateItem} from "../Utility/Interfaces.ts";
import {FlexSizeManager} from "../Utility/FlexSizeManager.ts";
import {Crafter} from "../TemplateBoard/Crafter.ts";
import {CssClassManager} from "../Utility/CssClassManager.ts";

export class Label implements BodyTemplateItem{
    message = ""
    uuid = v4()
    cssClasses = new CssClassManager()
    flexSize = new FlexSizeManager()
    crafter = null as Crafter|null

    addMessage(message:string) {
        this.message = message
    }
}