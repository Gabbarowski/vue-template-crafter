import {v4} from "uuid";
import {Header, HeaderTag} from "../Header/Header";
import {Input} from "../Input/Input";
import {CssClassManager} from "../Utility/CssClassManager";
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {Button} from "./../Button/Button";
import {reactive} from "vue";
import {FlexSizeManager} from "../Utility/FlexSizeManager";
import {BoardItemElement, TemplatePosition} from "../Interfaces";
import {Textbox} from "../Textbox/Textbox.ts";

export interface DefaultObject {
    [key: string]: any;
}


/**
 * The dynamic entry Class for the basic template crafter
 * {@link https://github.com/Gabbarowski/vue-template-crafter/blob/main/README.md}
 */
export class Crafter <T extends object = DefaultObject> {
    uuid = v4()
    cssClasses = new CssClassManager()
    headerItems = [] as Header[]
    bodyItems = reactive<BoardItemElement[]>([])
    footerLeftItems = reactive<BoardItemElement[]>([])
    footerRightItems = reactive<BoardItemElement[]>([])
    defaultInputWidth = null as null|FlexSizeManager
    usedObject: any|null

    // ModalSettings
    isBackgroundCloseEnabled = true
    modalCssClasses = new CssClassManager()
    modalMaxWidth = "790px"

    constructor() {
        const crafterStore = useTemplateCrafterStore()
        this.modalCssClasses.addClass(crafterStore.styleSetting.cssDefaultClass.modal)
        this.setBackgroundCloseEnabled(true)

    }

    openInModal() {
        const store = useTemplateCrafterStore();
        store.addCrafterModal(this)
    }

    setModalMaxWith(width: string) {
        this.modalMaxWidth = width
    }

    setObject(usedObject: T) {
        this.usedObject =  { ...usedObject };
        return this;
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
        this.cssClasses.addClass(crafterStore.styleSetting.cssDefaultClass.crafterWrapper)
        return header
    }

    /**
     * Add an Input to your crafter
     * @param {string} label The label of your new input
     * @param {string|number} preValue fill the pre Value
     */
    addInput(label: string, preValue: number|string = ""): Input {
        const input = reactive(new Input(label)) as Input;
        input.setValue(preValue)
        input.setCrafter(this)
        if(this.defaultInputWidth != null) {
            input.flexSize.setWidth(this.defaultInputWidth.mobileWidth, this.defaultInputWidth.tabletWidth, this.defaultInputWidth.desktopWidth)
        }
        this.bodyItems.push(input)
        return input as Input
    }

    /**
     * Add a mapped Input with the registered object to your crafter
     * @param {string} label The label of your new input
     * @param {string|number|symbol} attributeKey Select the correct attribute name of your object
     */
    addInputMapped(label: string, attributeKey: keyof T) {
        if(this.usedObject === null) {
            console.warn("No Object has been found. Please register an object with crafter.setObject({...})")
            return this.addInput("ERROR", "Object is not registered")
        }

        const preValue = this.usedObject[attributeKey] as string|number;
        if(!preValue) {
            console.warn(attributeKey.toString() + " is undefined. Please make sure, that the object has an key")
            return this.addInput("ERROR", "Pre Value is undefined")
        }
        return this.addInput(label, preValue).map(attributeKey)
    }

    /**
     * Get all Inputs of this Crafter
     */
    getAllInputs(): Input[] {
        const inputs = [] as Input[]
        const allItems = [...this.bodyItems, ...this.footerLeftItems, ...this.footerRightItems];
        for(const i of allItems) {
            if(i.constructor.name === Input.name) {
                if (i instanceof Input) {
                    inputs.push(i)
                }
            }
        }
        return inputs as Input[]
    }

    addButton(label: string): Button {
        const button = reactive(new Button(label)) as Button
        button.setCrafter(this)
        this.bodyItems.push(button)
        return button as Button
    }

    addTextbox(message: string) {
        const textbox = reactive(new Textbox(message)) as Textbox
        textbox.setCrafter(this)
        this.bodyItems.push(textbox)
        return textbox
    }

    /**
     * Move the element to a specific position in the template.
     * You can also specify the exact position or move it up or down by one entry.
     * @param {BoardItemElement} item Define the element to be removed
     * @param {TemplatePosition} templatePosition Define the element to be removed
     * @param {"end"|"start"|"up"|"down"|number} position Determine the position at which the element should be located
     */
    moveItem(item: BoardItemElement, templatePosition = "body" as TemplatePosition, position = "end" as "end"|"start"|"up"|"down"|number) {
        const foundIndex = this.removeItem(item)

        if(templatePosition === "body" && position==="end") this.bodyItems.push(item)
        if(templatePosition === "body" && position==="start") this.bodyItems.push(item)
        if(templatePosition === "body" && typeof position==="number") this.bodyItems.splice(position, 0, item)
        if(templatePosition === "body" && position==="up") {
            this.bodyItems.splice(foundIndex-1, 0, item)
        }
        if(templatePosition === "body" && position==="down") {
            this.bodyItems.splice(foundIndex+1, 0, item)
        }

        if(templatePosition === "footerLeft" && position==="end") this.footerLeftItems.push(item)
        if(templatePosition === "footerLeft" && position==="start") this.footerLeftItems.push(item)
        if(templatePosition === "footerLeft" && typeof position==="number") this.footerLeftItems.splice(position, 0, item)

        if(templatePosition === "footerRight" && position==="end") this.footerRightItems.push(item)
        if(templatePosition === "footerRight" && position==="start") this.footerRightItems.push(item)
        if(templatePosition === "footerRight" && typeof position==="number") this.footerRightItems.splice(position, 0, item)
    }

    /**
     * Checks in which TemplatePosition container the item is located and returns this value as a string
     * @param {BoardItemElement} item
     */
    getItemTemplatePosition(item: BoardItemElement): TemplatePosition|null {
        let foundIndex = this.bodyItems.findIndex(obj => obj.uuid === item.uuid)
        if(foundIndex>=0) {
            return "body"
        }
        foundIndex = this.footerLeftItems.findIndex(obj => obj.uuid === item.uuid)
        if(foundIndex>=0) {
            return "footerLeft"
        }
        foundIndex = this.footerRightItems.findIndex(obj => obj.uuid === item.uuid)
        if(foundIndex>=0) {
            return "footerRight"
        }
        return null
    }

    /**
     * Retains the itemIndex regardless of the position of the item
     * @param {BoardItemElement} item
     */
    getItemIndex(item: BoardItemElement): number|null {
        const templatePosition = this.getItemTemplatePosition(item)
        if(templatePosition === null) return null
        if(templatePosition === "body") {
            return this.bodyItems.findIndex(obj => obj.uuid === item.uuid)
        }
        if(templatePosition === "footerLeft") {
            return this.footerLeftItems.findIndex(obj => obj.uuid === item.uuid)
        }
        if(templatePosition === "footerRight") {
            return this.footerRightItems.findIndex(obj => obj.uuid === item.uuid)
        }
        return null
    }

    /**
     * Check whether the item is in the first position. The system automatically checks which template position the item is in.
     * @param {BoardItemElement} item
     */
    isItemFirst(item: BoardItemElement):boolean {
        const itemIndex = this.getItemIndex(item)
        return itemIndex === 0;
    }

    /**
     * Check whether the item is in the last position. The system automatically checks which template position the item is in.
     * @param {BoardItemElement} item
     */
    isItemLast(item: BoardItemElement):boolean {
        const templatePosition = this.getItemTemplatePosition(item)
        const itemIndex = this.getItemIndex(item)
        let containerItemsLength = 0
        if(templatePosition === null) return false
        if(templatePosition === "body") {
            containerItemsLength = this.bodyItems.length
        }
        if(templatePosition === "footerLeft") {
            containerItemsLength = this.footerLeftItems.length
        }
        if(templatePosition === "footerRight") {
            containerItemsLength = this.footerRightItems.length
        }
        containerItemsLength--;
        return containerItemsLength === itemIndex
    }

    /**
     * You can make a specific element disappear from the element again. Simply pass the element you want to remove.
     * @param {BoardItemElement} item Define the element to be removed
     */
    removeItem(item: BoardItemElement):number {
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
     * Checks whether all conditions of the template have been fulfilled.
     * @return {boolean} Returns a TRUE if the validation is successful
     */
    validate(): boolean {
        let isValidate = true
        for (const bodyItem of this.bodyItems) {
            if(Input.name === bodyItem.constructor.name) {
                const inputItem = bodyItem as Input
                if(!inputItem.validate()) isValidate = false
            }
        }
        return isValidate
    }

    handleObject(handleObject: object|null = null): T {
        if(!this.validate()) {
            console.warn("The validation of your inputs wasn't correct")
            return this.usedObject
        }
        if(handleObject) this.usedObject = handleObject
        if(!this.usedObject) {
            console.warn("No Object has been found. Please register an object with crafter.setObject({...})")
            return this.usedObject
        }

        for(const input of this.getAllInputs()) {
            if(!input.usedAttributeKey ) continue;
            this.usedObject[input.usedAttributeKey] = input.value
        }
        return this.usedObject
    }

    setBackgroundCloseEnabled(value = true) {
        this.isBackgroundCloseEnabled = value
    }


}