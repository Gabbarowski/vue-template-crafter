import {v4} from "uuid";
import {BodyTemplateItem} from "../Utility/Interfaces";
import {FlexSizeManager} from "../Utility/FlexSizeManager";
import {Crafter} from "../TemplateBoard/Crafter";
import {CssClassManager} from "../Utility/CssClassManager";

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