import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";
import {Label} from "../Label/Label.ts";

export class RadioButton extends AbstractItemElement {

    label = null as null|Label
    radioGroup = "radio-group"
    isChecked = false
    value = null as null|any
    usedAttributeKey = null as string|number|symbol|null

    constructor() {
        super();
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

    setChecked(value = true) {
        if(value) this.uncheckedInSameRadioGroup()
        this.isChecked = value
    }

    uncheckedInSameRadioGroup() {
        if(!this.crafter) return
        const radioButtons = this.crafter.getAllRadioButtons()
        const sameGroupRadios = radioButtons.filter(obj => obj.radioGroup === this.radioGroup)
        for(const radio of sameGroupRadios) {
            radio.setChecked(false)
        }

    }
}