import {AbstractItemElement} from "../Utility/AbstractItemElement";
import {Label} from "../Label/Label";

export class RadioButton extends AbstractItemElement {

    label = null as null|Label
    radioGroup = "radio-group"
    isChecked = false
    preChecked = false
    value = null as null|any
    usedAttributeKey = null as string|number|symbol|null

    constructor() {
        super();
        this.cssClassesItem.addClass(this.getStyleSettings().cssDefaultClass.radioButtonItem)
        this.cssClassesWrapper.addClass(this.getStyleSettings().cssDefaultClass.radioButtonWrapper)
    }

    /**
     * Connect this item to the added object. The value can then be written automatically
     * @param attributeKey
     */
    map(attributeKey: string|number|symbol) {
        this.usedAttributeKey = attributeKey
        return this
    }

    setLabel(message: string) {
        this.label = new Label()
        this.label.addMessage(message)
        return this
    }

    setRadioGroup(group: string) {
        this.radioGroup = group
    }

    setValue(value: any) {
        this.value = value
    }

    setChecked(value = true, initiate = true) {
        if(value) this.uncheckedInSameRadioGroup()
        if(initiate) {
            this.preChecked = value
        }
        this.isChecked = value
    }

    uncheckedInSameRadioGroup() {
        if(!this.crafter) return
        const radioButtons = this.crafter.getAllRadioButtons()
        const sameGroupRadios = radioButtons.filter(obj => obj.radioGroup === this.radioGroup)
        for(const radio of sameGroupRadios) {
            radio.setChecked(false, false)
        }
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