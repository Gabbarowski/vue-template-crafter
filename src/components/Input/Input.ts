import {v4} from "uuid";
import {Label} from "../Label/Label.ts";
import {CssClassManager} from "../Utility/CssClassManager.ts";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import {FlexSizeManager} from "../Utility/FlexSizeManager.ts";

export class Input {
    uuid = v4()
    label = new Label()
    value = "" as string|number
    preValue = "" as string|number
    isMandatory = false
    cssClasses = new CssClassManager()
    flexSize = new FlexSizeManager()
    constructor(label: string) {
        const crafterStore = useTemplateCrafterStore();
        this.label.addMessage(label)
        this.cssClasses.addClass(crafterStore.styleSetting.cssDefaultClass.input)
    }

    setValue(value: string|number) {
        this.preValue = value
        this.value = value
    }

    setSize(mobileWidth: string, tabletWidth: string, desktopWidth: string) {
        this.flexSize.tabletWidth = tabletWidth
        this.flexSize.mobileWidth = mobileWidth
        this.flexSize.desktopWidth = desktopWidth
    }
}