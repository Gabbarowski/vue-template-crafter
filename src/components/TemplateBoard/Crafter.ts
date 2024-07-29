import {v4} from "uuid";
import {Header, HeaderTag} from "../Header/Header.ts";
import {Input} from "../Input/Input.ts";
import {CssClassManager} from "../Utility/CssClassManager.ts";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import {Label} from "../Label/Label.ts";
import {Button} from "../Button/Button.ts";
import {reactive} from "vue";
import {FlexSizeManager} from "../Utility/FlexSizeManager.ts";

export class Crafter {
    uuid = v4()
    cssClass = new CssClassManager()
    headerItems = [] as Header[]
    bodyItems = reactive<(Input|Label|Button)[]>([])
    defaultInputWidth = null as null|FlexSizeManager

    constructor() {

    }

    /**
     * Set the default width of input fields. For HTML Tags: Input, Select
     * Set the width of your component for Mobile, Tablet and Desktop Size.
     * Set to null to ignore default settings or to revoke previously made settings
     * If not used it will manage by standard settings. StyleSettings => itemDefaultWidth.input
     * @param mobileWidth
     * @param tabletWidth
     * @param desktopWidth
     */
    setDefaultInputSize(mobileWidth: string|null, tabletWidth: string|null, desktopWidth: string|null) {
        this.defaultInputWidth = new FlexSizeManager()
        this.defaultInputWidth.setWidth(mobileWidth, tabletWidth, desktopWidth)
    }

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
        if(this.defaultInputWidth != null) {
            input.flexSize.setWidth(this.defaultInputWidth.mobileWidth, this.defaultInputWidth.tabletWidth, this.defaultInputWidth.desktopWidth)
        }
        this.bodyItems.push(input)
        return input
    }

    addButton(label: string) {
        const button = reactive(new Button(label))
        this.bodyItems.push(button)
        console.log(label)
        return button
    }

    /**
     * Checks whether all conditions of the template have been fulfilled. Returns a TRUE if the validation is successful
     */
    validate() {
        let isValidate = true
        for (const bodyItem of this.bodyItems) {
            if(Input.name === bodyItem.constructor.name) {
                const inputItem = bodyItem as Input
                if(!inputItem.validate()) isValidate = false
            }
        }
        return isValidate
    }


}