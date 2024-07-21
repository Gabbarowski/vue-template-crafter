import {v4} from "uuid";
import {Header, HeaderTag} from "../Header/Header.ts";
import {Input} from "../Input/Input.ts";
import {CssClassManager} from "../Utility/CssClassManager.ts";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import {Label} from "../Label/Label.ts";

export class Crafter {
    uuid = v4()
    cssClass = new CssClassManager()
    headerItems = [] as Header[]
    bodyItems = [] as (Input|Label)[]


    addHeader(topic: string, headerTag: HeaderTag = "h3") {
        const crafterStore = useTemplateCrafterStore()
        const header = new Header(topic, headerTag)
        this.headerItems.push(header)
        this.cssClass.addClass(crafterStore.styleSetting.cssDefaultClass.crafterWrapper)
        return header
    }

    addInput(label: string, preValue: number|string) {
        const input = new Input(label);
        input.setValue(preValue)
        this.bodyItems.push(input)
        return input
    }

}