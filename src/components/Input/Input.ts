import {v4} from "uuid";
import {Label} from "../Label/Label.ts";
import {CssClassManager} from "../Utility/CssClassManager.ts";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import {FlexSizeManager} from "../Utility/FlexSizeManager.ts";
import {reactive} from "vue";
import {Button} from "../Button/Button.ts";
import {BodyTemplateItem} from "../Utility/Interfaces.ts";

export class Input implements BodyTemplateItem{
    uuid = v4()
    label = new Label()
    value = "" as string|number
    preValue = "" as string|number
    isMandatory = false
    cssClasses = new CssClassManager()
    flexSize = new FlexSizeManager()
    actionButtons = reactive<Button[]>([])
    constructor(label: string) {
        const crafterStore = useTemplateCrafterStore();
        const styleSetting = crafterStore.styleSetting
        this.label.addMessage(label)
        this.cssClasses.addClass(styleSetting.cssDefaultClass.input)
        const inputWidth = styleSetting.itemDefaultWidth.input
        this.flexSize.setWidth(inputWidth.mobileWidth, inputWidth.tabletWidth, inputWidth.desktopWidth )
    }

    setValue(value: string|number) {
        this.preValue = value
        this.value = value
    }

    addButton(label: string) {
        const newBtn = reactive(new Button(label))
        this.actionButtons.push(newBtn)
        return newBtn
    }
}