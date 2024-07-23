import {v4} from "uuid";
import {Header, HeaderTag} from "../Header/Header.ts";
import {Input} from "../Input/Input.ts";
import {CssClassManager} from "../Utility/CssClassManager.ts";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import {Label} from "../Label/Label.ts";
import {Button} from "../Button/Button.ts";
import {reactive} from "vue";

export class Crafter {
    uuid = v4()
    cssClass = new CssClassManager()
    headerItems = [] as Header[]
    bodyItems = reactive<(Input|Label|Button)[]>([])


    addHeader(topic: string, headerTag: HeaderTag = "h3") {
        const crafterStore = useTemplateCrafterStore()
        const header = new Header(topic, headerTag)
        this.headerItems.push(header)
        this.cssClass.addClass(crafterStore.styleSetting.cssDefaultClass.crafterWrapper)
        return header
    }

    addInput(label: string, preValue: number|string) {
        const input = reactive(new Input(label));
        input.setValue(preValue)
        this.bodyItems.push(input)
        return input
    }

    addButton(label: string) {
        const button = reactive(new Button(label))
        this.bodyItems.push(button)
        console.log(label)
        return button
    }


}