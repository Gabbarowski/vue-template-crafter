import {v4} from "uuid";
import {Header, HeaderTag} from "../Header/Header";
import {Input} from "../Input/Input";
import {CssClassManager} from "../Utility/CssClassManager";
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {Button} from "./../Button/Button";
import {reactive} from "vue";
import {FlexSizeManager} from "../Utility/FlexSizeManager";
import {BoardItemElement, TemplatePosition} from "../Utility/Interfaces";

/**
 * The dynamic entry Class for the basic template crafter
 * {@link https://github.com/Gabbarowski/vue-template-crafter/blob/main/README.md}
 */
export class Crafter {
    uuid = v4()
    cssClass = new CssClassManager()
    headerItems = [] as Header[]
    bodyItems = reactive<BoardItemElement[]>([])
    footerLeftItems = reactive<BoardItemElement[]>([])
    footerRightItems = reactive<BoardItemElement[]>([])
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

    /**
     * Add an Input to your crafter
     * @param {string} label The label of your new input
     * @param {string|number} preValue fill the pre Value
     */
    addInput(label: string, preValue: number|string): Input {
        const input = reactive(new Input(label));
        input.setValue(preValue)
        input.setCrafter(this)
        if(this.defaultInputWidth != null) {
            input.flexSize.setWidth(this.defaultInputWidth.mobileWidth, this.defaultInputWidth.tabletWidth, this.defaultInputWidth.desktopWidth)
        }
        this.bodyItems.push(input)
        return input as Input
    }

    addButton(label: string): Button {
        const button = reactive(new Button(label)) as Button
        button.setCrafter(this)
        this.bodyItems.push(button)
        return button as Button
    }

    moveItem(item: BoardItemElement, container = "body" as TemplatePosition, position = "end" as "end"|"start"|"up"|"down"|number) {
        const foundIndex = this.removeItem(item)

        if(container === "body" && position==="end") this.bodyItems.push(item)
        if(container === "body" && position==="start") this.bodyItems.push(item)
        if(container === "body" && typeof position==="number") this.bodyItems.splice(position, 0, item)
        if(container === "body" && position==="up") {
            this.bodyItems.splice(foundIndex-1, 0, item)
        }
        if(container === "body" && position==="down") {
            this.bodyItems.splice(foundIndex+1, 0, item)
        }

        if(container === "footerLeft" && position==="end") this.footerLeftItems.push(item)
        if(container === "footerLeft" && position==="start") this.footerLeftItems.push(item)
        if(container === "footerLeft" && typeof position==="number") this.footerLeftItems.splice(position, 0, item)

        if(container === "footerRight" && position==="end") this.footerRightItems.push(item)
        if(container === "footerRight" && position==="start") this.footerRightItems.push(item)
        if(container === "footerRight" && typeof position==="number") this.footerRightItems.splice(position, 0, item)
    }

    removeItem(item: BoardItemElement) {
        let foundIndex = this.bodyItems.findIndex(obj => obj.uuid === item.uuid)
        if(foundIndex>=0) {
            this.bodyItems.splice(foundIndex, 1)
            return foundIndex
        }
        foundIndex = this.footerLeftItems.findIndex(obj => obj.uuid === item.uuid)
        if(foundIndex>=0) {
            this.footerLeftItems.splice(foundIndex, 1)
            return foundIndex
        }
        foundIndex = this.footerRightItems.findIndex(obj => obj.uuid === item.uuid)
        if(foundIndex>=0) {
            this.footerRightItems.splice(foundIndex, 1)
            return foundIndex
        }

        return foundIndex
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