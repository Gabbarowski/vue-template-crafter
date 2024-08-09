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
import {HandledObjectType} from "../Interfaces/ObjectHandleType.ts";
import {Checkbox} from "../Checkbox/Checkbox.ts";
import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";
import {RadioButton} from "../RadioButton/RadioButton.ts";
import {Select} from "../Select/Select.ts";
import {UtilityFunctions} from "../Utility/UtilityFunctions.ts";
import {Break} from "../Break/Break.ts";
import {Icon} from "../Icon/Icon.ts";

/**
 * The dynamic entry Class for the basic template crafter
 * {@link https://github.com/Gabbarowski/vue-template-crafter/blob/main/README.md}
 */
export class Crafter <T extends object = HandledObjectType> {
    uuid = v4()
    cssClasses = new CssClassManager()
    itemContainers: { [key: string]: AbstractItemElement[] } = {};
    defaultInputWidth = null as null|FlexSizeManager
    usedObject: any|null

    // ModalSettings
    isBackgroundCloseEnabled = true
    modalCssClasses = new CssClassManager()
    modalMaxWidth = "790px"
    static radioButtonValues = [] as [key: string][];

    // Helper for create crafter
    /**
     * Select the default container if you create a new item
     */
    selectedContainer = "body" as string|TemplatePosition

    constructor() {
        const crafterStore = useTemplateCrafterStore()
        this.cssClasses.addClass(crafterStore.styleSetting.cssDefaultClass.crafterWrapper)
        this.modalCssClasses.addClass(crafterStore.styleSetting.cssDefaultClass.modal)
        this.setBackgroundCloseEnabled(true)
    }

    /**
     * For full Support you should make the Crafter reactive
     */
    getReactive() {
        return reactive(this)
    }

    /**
     * Get all Items of a specific container
     * @param containerName Type the name / position of container
     * @return {AbstractItemElement[]} all items which can rendered
     */
    getContainerItems(containerName: string|TemplatePosition): AbstractItemElement[] {
        if(!this.itemContainers[containerName]) {
            return [] as AbstractItemElement[]
        }
        return this.itemContainers[containerName]
    }

    private addToContainer(containerName: string|TemplatePosition, item: AbstractItemElement) {
        if(!this.itemContainers[containerName]) {
            this.itemContainers[containerName] = reactive<AbstractItemElement[]>([]) as AbstractItemElement[]
        }
        this.itemContainers[containerName].push(item)
    }

    private getContainerNameByItem(item: AbstractItemElement): string|TemplatePosition|null {
        for (const key in this.itemContainers) {
            if(this.getContainerItems(key).find(obj => obj.uuid === item.uuid)) {
                return key
            }
        }
        return null
    }

    private getContainerByItem(item: AbstractItemElement): AbstractItemElement[]|null {
        const containerName = this.getContainerNameByItem(item)
        if(!containerName) return null
        const result = this.getContainerItems(containerName);
        if(result) return result
        return null
    }

    /**
     * Extract all ItemElement of each Template position on this crafter
     * @param className (optional) for a specific AbstractItemElement Class e.g. Input, Button, Checkbox.
     */
    getAllItemElements(className: string|null = null): AbstractItemElement[] {
        const foundElements = [] as AbstractItemElement[]
        for(const key in this.itemContainers) {
            for (const item of this.getContainerItems(key)) {
                foundElements.push(item)
            }
        }
        if(!className) {
            return foundElements
        }
        return foundElements.filter(obj => obj.constructor.name === className)
    }

    openInModal() {
        const store = useTemplateCrafterStore();
        store.addCrafterModal(this);
        return this
    }

    setModalMaxWith(width: string) {
        this.modalMaxWidth = width
        return this
    }

    setObject(usedObject: T) {
        this.usedObject = JSON.parse(JSON.stringify(usedObject)) as T;
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
    setDefaultInputSize(mobileWidth: string|null, tabletWidth: string|null = null, desktopWidth: string|null = null): this {
        this.defaultInputWidth = new FlexSizeManager()
        this.defaultInputWidth.setWidth(mobileWidth, tabletWidth, desktopWidth)
        return this
    }

    addHeader(topic: string, headerTag: HeaderTag = "h3") {
        const crafterStore = useTemplateCrafterStore()
        const header = reactive(new Header(topic, headerTag)) as Header
        header.setCrafter(this)
        this.addToContainer(this.selectedContainer, header)
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
        this.addToContainer(this.selectedContainer, input)
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
        this.addToContainer(this.selectedContainer, button)
        return button as Button
    }

    addTextbox(message: string) {
        const textbox = reactive(new Textbox(message)) as Textbox
        textbox.setCrafter(this)
        this.addToContainer(this.selectedContainer, textbox)
        return textbox
    }

    addSelect(label: string): Select {
        const select = reactive(new Select()) as Select
        select.addLabel(label)
        select.setCrafter(this)
        if(this.defaultInputWidth != null) {
            select.flexSize.setWidth(this.defaultInputWidth.mobileWidth, this.defaultInputWidth.tabletWidth, this.defaultInputWidth.desktopWidth)
        }
        this.addToContainer(this.selectedContainer, select)
        return select
    }

    addSelectMapped(label: string, attributeKey: keyof T) {
        if(!this.usedObject) {
            console.warn("No Object has been found. Please register an object with crafter.setObject({...})")
            return this.addSelect("ERROR")
        }
        return this.addSelect(label).map(attributeKey)
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
        this.addToContainer(this.selectedContainer, checkbox)
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
            return storage.some(item => UtilityFunctions.deepEqual(item, value))
        }
        if(typeof storage === "string") {
            return (storage === value)
        }
        return false
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
        this.addToContainer(this.selectedContainer, radioButton)
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
            radioButton.setChecked(UtilityFunctions.deepEqual(this.usedObject[attributeKey], value))
        }
        radioButton.map(attributeKey)
        return radioButton
    }

    addIcon() {
        const iconItem = reactive(new Icon()) as Icon
        iconItem.setCrafter(this)
        this.addToContainer("body", iconItem)
        return iconItem
    }

    addBreak() {
        const breakItem = reactive(new Break()) as Break
        breakItem.setCrafter(this)
        this.addToContainer("body", breakItem)
        return breakItem
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
     * @param {BoardItemElement} item Define the element to be moved
     * @param {TemplatePosition} templatePosition Define the element to be moved
     * @param {"end"|"start"|"up"|"down"|number} position Determine the position at which the element should be located
     */
    moveItem(item: BoardItemElement, templatePosition = "body" as string|TemplatePosition, position = "end" as "end"|"start"|"up"|"down"|number) {

        const foundIndex = this.removeItem(item)
        const container = this.getContainerItems(templatePosition)

        // If container not exists create
        if(!this.itemContainers[templatePosition]) {
            this.itemContainers[templatePosition] = reactive([] as AbstractItemElement[]) as AbstractItemElement[]
            this.itemContainers[templatePosition].push(item)
            return;
        }
        if(!container) return
        if(position==="end") this.itemContainers[templatePosition].push(item)
        if(position==="start") this.itemContainers[templatePosition].unshift(item)
        if(typeof position==="number") this.itemContainers[templatePosition].splice(position, 0, item)
        if(position==="up") {
            this.itemContainers[templatePosition].splice(foundIndex-1, 0, item)
        }
        if(position==="down") {
            this.itemContainers[templatePosition].splice(foundIndex+1, 0, item)
        }
    }

    /**
     * Retains the itemIndex regardless of the position of the item
     * @param {BoardItemElement} item
     */
    getItemIndex(item: BoardItemElement): number|null {
        const container = this.getContainerByItem(item)
        if(!container) return null
        return container.findIndex(obj => obj.uuid === item.uuid)
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
        const container = this.getContainerByItem(item)
        if(!container) return false
        const itemIndex = this.getItemIndex(item)
        if(itemIndex === null) return false
        return container.length === (itemIndex+1)
    }

    /**
     * You can make a specific element disappear from the element again. Simply pass the element you want to remove.
     * @param {BoardItemElement} item Define the element to be removed
     * @return {number} old Index number of item
     */
    removeItem(item: BoardItemElement):number {
        const itemContainer = this.getContainerByItem(item)
        if(!itemContainer) {
            return -1
        }
        let foundIndex = itemContainer.findIndex(obj => obj.uuid === item.uuid)
        if(foundIndex>=0) {
            itemContainer.splice(foundIndex, 1)
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
        // Objekt is "saved" so the preValues will be sync with current values
        this.resetPreValue()
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


    /**
     * Select the container where the next created item will render
     * @param container
     */
    selectContainer(container: string|TemplatePosition): this {
        this.selectedContainer = container
        return this
    }

    /**
     * Check whether the value in any element has changed due to user activity.
     */
    isChanged() {
        const items = this.getAllItemElements()
        for(const item of items) {
            if(
                item.constructor.name === Input.name ||
                item.constructor.name === Checkbox.name ||
                item.constructor.name === RadioButton.name ||
                item.constructor.name === Select.name
            ) {
                const relevantItem = item as Input|Checkbox|RadioButton|Select
                if(relevantItem.isChanged()) {
                    return true
                }
            }
        }
        return false
    }

    /**
     * Check whether the value in any element has changed due to user activity.
     */
    resetPreValue() {
        const items = this.getAllItemElements()
        for(const item of items) {
            if(
                item.constructor.name === Input.name ||
                item.constructor.name === Checkbox.name ||
                item.constructor.name === RadioButton.name ||
                item.constructor.name === Select.name
            ) {
                const relevantItem = item as Input|Checkbox|RadioButton|Select
                relevantItem.resetPreValue()
            }
        }
    }

}