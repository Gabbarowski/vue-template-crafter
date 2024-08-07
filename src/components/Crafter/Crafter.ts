import {v4} from "uuid";
import {Header, HeaderTag} from "../Header/Header";
import {Input} from "../Input/Input";
import {CssClassManager} from "../Utility/CssClassManager";
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {Button} from "./../Button/Button";
import { reactive} from "vue";
import {FlexSizeManager} from "../Utility/FlexSizeManager";
import {BoardItemElement, TemplatePosition} from "../Interfaces";
import {Textbox} from "../Textbox/Textbox.ts";
import {HandledObjectType} from "../Interfaces/ObjectHandleType.ts";
import {Checkbox} from "../Checkbox/Checkbox.ts";
import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";
import {RadioButton} from "../RadioButton/RadioButton.ts";
import {Select} from "../Select/Select.ts";

/**
 * The dynamic entry Class for the basic template crafter
 * {@link https://github.com/Gabbarowski/vue-template-crafter/blob/main/README.md}
 */
export class Crafter <T extends object = HandledObjectType> {
    uuid = v4()
    cssClasses = new CssClassManager()
    headerItems = reactive<AbstractItemElement[]>([])
    bodyItems = reactive<AbstractItemElement[]>([])
    footerLeftItems = reactive<AbstractItemElement[]>([])
    footerRightItems = reactive<AbstractItemElement[]>([])
    defaultInputWidth = null as null|FlexSizeManager
    usedObject: any|null

    // ModalSettings
    isBackgroundCloseEnabled = true
    modalCssClasses = new CssClassManager()
    modalMaxWidth = "790px"
    static radioButtonValues = [] as [key: string][];

    constructor() {
        const crafterStore = useTemplateCrafterStore()
        this.modalCssClasses.addClass(crafterStore.styleSetting.cssDefaultClass.modal)
        this.setBackgroundCloseEnabled(true)
    }

    /**
     * For full Support you should make the Crafter reactive
     */
    getReactive() {
        return reactive(this)
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
     * !IMPORTANT! Set these settings before you add the input
     * @param mobileWidth
     * @param tabletWidth
     * @param desktopWidth
     */
    setDefaultInputSize(mobileWidth: string|null, tabletWidth: string|null = null, desktopWidth: string|null = null) {
        this.defaultInputWidth = new FlexSizeManager()
        this.defaultInputWidth.setWidth(mobileWidth, tabletWidth, desktopWidth)
    }

    addHeader(topic: string, headerTag: HeaderTag = "h3") {
        const crafterStore = useTemplateCrafterStore()
        const header = reactive(new Header(topic, headerTag)) as Header
        header.setCrafter(this)
        this.bodyItems.push(header)
        this.cssClasses.addClass(crafterStore.styleSetting.cssDefaultClass.crafterWrapper)
        return header
    }

    /**
     * Add an Input to your crafter
     * @param {string} label The label of your new input
     * @param {string|number} preValue fill the pre Value
     */
    addInput(label: string, preValue: any = ""): Input {
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
        if(!this.usedObject) {
            console.warn("No Object has been found. Please register an object with crafter.setObject({...})")
            return this.addInput("ERROR", "Object is not registered")
        }

        const preValue = this.usedObject[attributeKey] as string|number;
        if(!preValue) {
            console.warn(attributeKey.toString() + " is undefined. Please make sure, that the object has an key")
            return this.addInput(label, "")
        }
        return this.addInput(label, preValue).map(attributeKey)
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

    addSelect(label: string): Select {
        const select = reactive(new Select()) as Select
        select.addLabel(label)
        select.setCrafter(this)
        if(this.defaultInputWidth != null) {
            select.flexSize.setWidth(this.defaultInputWidth.mobileWidth, this.defaultInputWidth.tabletWidth, this.defaultInputWidth.desktopWidth)
        }
        this.bodyItems.push(select)
        return select
    }

    /**
     * Add a checkbox to crafter.
     * @param {string} label Set the label of checkbox
     */
    addCheckbox(label: string) {
        const checkbox = reactive(new Checkbox()) as Checkbox
        checkbox.setCrafter(this)
        checkbox.setLabel(label)
        if(this.defaultInputWidth != null) {
            checkbox.flexSize.setWidth(this.defaultInputWidth.mobileWidth, this.defaultInputWidth.tabletWidth, this.defaultInputWidth.desktopWidth)
        }
        this.bodyItems.push(checkbox)
        return checkbox
    }


    addCheckboxMapped(label: string, attributeKey: keyof T, value: any|null = null) {
        if(!this.usedObject) {
            console.warn("No Object has been found. Please register an object with crafter.setObject({...})")
            return this.addCheckbox("ERROR")
        }
        const checkbox = this.addCheckbox(label)
        if(value) {
            checkbox.setValue(value)
        } else {
            checkbox.setChecked(this.usedObject[attributeKey] as boolean)
        }
        if(value ) {
            checkbox.setChecked(this.checkIsCheckboxPreChecked(this.usedObject[attributeKey], value))
        }
        checkbox.map(attributeKey)
        return checkbox
    }

    private checkIsCheckboxPreChecked(storage: any, value: any):boolean {

        if(Array.isArray( storage ) && typeof value === "string") {
            return storage.includes(value)
        }
        if(Array.isArray( storage ) && typeof value === "object") {
            return storage.some(item => this.deepEqual(item, value))
        }
        if(typeof storage === "string") {
            return (storage === value)
        }
        return false
    }

    private deepEqual(obj1: any, obj2: any) {
        if (obj1 === obj2) return true;
        if (typeof obj1 !== 'object' || obj1 === null ||
            typeof obj2 !== 'object' || obj2 === null) return false;

        let keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        for (let key of keys1) {
            if (!keys2.includes(key) || !this.deepEqual(obj1[key], obj2[key])) return false;
        }

        return true;
    }


    addRadioButton(label: string, radioGroup: string|null = null, value = null as any|null): RadioButton {
        const radioButton = reactive(new RadioButton()) as RadioButton
        radioButton.setCrafter(this)
        radioButton.setLabel(label)
        if(radioGroup) {
            radioButton.setRadioGroup(radioGroup)
        } else {
            radioButton.setRadioGroup("Radio-Group-"+this.uuid)
        }
        if(value) {
            radioButton.setValue(value)
        }
        this.bodyItems.push(radioButton)
        return radioButton
    }

    addRadioButtonMapped(label: string, attributeKey: keyof T,radioGroup: string|null = null, value = null as null|any) {
        if(!this.usedObject) {
            console.warn("No Object has been found. Please register an object with crafter.setObject({...})")
            return this.addRadioButton("ERROR")
        }
        const radioButton = this.addRadioButton(label, radioGroup, value)
        if(value) {
            radioButton.setValue(value)
        } else {
            radioButton.setChecked(this.usedObject[attributeKey] as boolean)
        }
        if(value ) {
            radioButton.setChecked(this.deepEqual(this.usedObject[attributeKey], value))
        }
        radioButton.map(attributeKey)
        return radioButton
    }


    /**
     * Extract all ItemElement of each Template position on this crafter
     * @param className (optional) for a specific AbstractItemElement Class e.g. Input, Button, Checkbox.
     */
    getAllItemElements(className: string|null = null): AbstractItemElement[] {
        if(!className) {
            return [...this.bodyItems, ...this.footerLeftItems, ...this.footerRightItems] as AbstractItemElement[];
        }
        const foundElements = [] as AbstractItemElement[]
        for(const i of this.getAllItemElements()) {
            if(i.constructor.name === className) {
                    foundElements.push(i)
            }
        }
        return foundElements as AbstractItemElement[]
    }

    /**
     * Get all Inputs of this Crafter
     */
    getAllInputs(): Input[] {
        return this.getAllItemElements(Input.name) as Input[]
    }

    /**
     * Get all Buttons of this Crafter
     */
    getAllButtons(): Button[] {
        return this.getAllItemElements(Button.name) as Button[]
    }

    /**
     * Get all Checkboxes of this Crafter
     */
    getAllCheckboxes(): Checkbox[] {
        return this.getAllItemElements(Checkbox.name) as Checkbox[]
    }

    getAllRadioButtons(): RadioButton[] {
        return this.getAllItemElements(RadioButton.name) as RadioButton[]
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
        if(templatePosition === "body" && position==="start") this.bodyItems.unshift(item)
        if(templatePosition === "body" && typeof position==="number") this.bodyItems.splice(position, 0, item)
        if(templatePosition === "body" && position==="up") {
            this.bodyItems.splice(foundIndex-1, 0, item)
        }
        if(templatePosition === "body" && position==="down") {
            this.bodyItems.splice(foundIndex+1, 0, item)
        }

        if(templatePosition === "footerLeft" && position==="end") this.footerLeftItems.push(item)
        if(templatePosition === "footerLeft" && position==="start") this.footerLeftItems.unshift(item)
        if(templatePosition === "footerLeft" && typeof position==="number") this.footerLeftItems.splice(position, 0, item)

        if(templatePosition === "footerRight" && position==="end") this.footerRightItems.push(item)
        if(templatePosition === "footerRight" && position==="start") this.footerRightItems.unshift(item)
        if(templatePosition === "footerRight" && typeof position==="number") this.footerRightItems.splice(position, 0, item)

        if(templatePosition === "header" && position==="end") this.headerItems.push(item)
        if(templatePosition === "header" && position==="start") this.headerItems.unshift(item)
        if(templatePosition === "header" && typeof position==="number") this.headerItems.splice(position, 0, item)
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
        if(templatePosition === "header") {
            return this.headerItems.findIndex(obj => obj.uuid === item.uuid)
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
        foundIndex = this.headerItems.findIndex(obj => obj.uuid === item.uuid)
        if(foundIndex>=0) {
            this.headerItems.splice(foundIndex, 1)
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
        for (const inputItem of this.getAllInputs()) {
                if(!inputItem.validate()) isValidate = false
        }
        for (const checkbox of this.getAllCheckboxes()) {
            if(!checkbox.validate()) isValidate = false
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

        //// Clear all Checkboxes if there are array and ist mapped with object
        for(const checkbox of this.getAllCheckboxes()) {
            if(!checkbox.usedAttributeKey ) continue;
            if(Array.isArray(this.usedObject[checkbox.usedAttributeKey])) {
                this.usedObject[checkbox.usedAttributeKey] = []
            }
        }

        for(const checkbox of this.getAllCheckboxes()) {
                if(!checkbox.usedAttributeKey ) continue;
                // Check if value is set. If not only boolean will include to object
                if(checkbox.value && checkbox.isChecked) {
                    this.addResultToUsedObject(checkbox.usedAttributeKey, checkbox.value)
                } else if(!checkbox.value) {
                    this.usedObject[checkbox.usedAttributeKey] = checkbox.isChecked
                }
        }

        /// Clear all Radiobuttons
        for (const radioButton of this.getAllRadioButtons()) {
            if(!radioButton.usedAttributeKey) continue;
            this.usedObject[radioButton.usedAttributeKey] = false
        }
        for (const radioButton of this.getAllRadioButtons()) {
            if(!radioButton.usedAttributeKey) continue;
            if(radioButton.value && radioButton.isChecked) {

                this.usedObject[radioButton.usedAttributeKey] = radioButton.value
            } else {

                this.usedObject[radioButton.usedAttributeKey] = radioButton.isChecked
            }
        }
        return this.usedObject
    }

    private addResultToUsedObject(key: string|number|symbol, value: any) {
        /// If result is an array, the checkbox value will be added
        if(Array.isArray(this.usedObject[key])) {
            this.usedObject[key].push(value)
            return;
        }
        if(typeof this.usedObject[key] === "string") {
            this.usedObject[key] = value
            return;
        }
    }

    setBackgroundCloseEnabled(value = true) {
        this.isBackgroundCloseEnabled = value
    }

    /**
     * Will close and remove the crafter from modal storage
     */
    close () {
        const store = useTemplateCrafterStore();
        store.removeCrafterModal(this)
    }


}