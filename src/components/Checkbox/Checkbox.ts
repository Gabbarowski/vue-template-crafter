import {AbstractItemElement} from "../Utility/AbstractItemElement";
import {Label} from "../Label/Label.ts";

export class Checkbox  extends AbstractItemElement {
    label = new Label()
    value = null as any | null
    isChecked = false as boolean
    preChecked = false as boolean
    isRequired = false
    usedAttributeKey = null as string | number | symbol | null
    requiredErrorMessage = "It is a mandatory field"
    errorMessage = ""
    changedEvents = [] as (() => void)[]
    checkEvents = [] as (() => void)[]
    uncheckEvents = [] as (() => void)[]

    constructor() {
        super();
        this.cssClassesWrapper.addClass(this.getStyleSettings().cssDefaultClass.checkboxWrapper)
        this.cssClassesItem.addClass(this.getStyleSettings().cssDefaultClass.checkbox)
        this.flexSize.setWidth(
            this.getStyleSettings().itemDefaultWidth.input.mobileWidth,
            this.getStyleSettings().itemDefaultWidth.input.tabletWidth,
            this.getStyleSettings().itemDefaultWidth.input.desktopWidth,
        )
    }

    /**
     * Connect this item to the added object. The value can then be written automatically
     * @param attributeKey
     */
    map(attributeKey: string | number | symbol) {
        this.usedAttributeKey = attributeKey
        return this
    }

    setLabel(message: string) {
        this.label.addMessage(message)
    }

    setValue(value: any) {
        this.value = value
        return this
    }

    setChecked(checked = true) {
        this.preChecked = checked
        this.isChecked = checked
    }

    setRequired(value = true, errorMessage = "It is a mandatory field") {
        this.isRequired = value
        this.requiredErrorMessage = errorMessage
    }

    setAttributeKey(key: string) {
        this.usedAttributeKey = key
        return this
    }

    validate() {
        this.errorMessage = ""
        if (this.isRequired && !this.value) {
            this.errorMessage = this.requiredErrorMessage
            return false
        }
        return true
    }

    onChanged(event = () => {
    }) {
        this.changedEvents.push(event)
        return this
    }

    onChecked(event = () => {}) {
        this.checkEvents.push(event)
        return this
    }

    onUnchecked(event = () => {}) {
        this.uncheckEvents.push(event)
        return this
    }

    /**
     * Is Data changed?
     * @return True => The value differs from the initial value
     */
    isChanged() {
        return this.preChecked !== this.isChecked
    }

    /**
     * Will reset the preValue to the current value
     */
    resetPreValue() {
        this.preChecked = this.isChecked
        return this
    }
}