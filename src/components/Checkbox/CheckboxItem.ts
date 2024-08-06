import {v4} from "uuid";
import {Label} from "../Label/Label.ts";

export class CheckboxItem {
    uuid = v4()
    label = new Label()
    value = false as boolean
    isRequired = false
    usedAttributeKey = null as string|number|symbol|null
    requiredErrorMessage = "It is a mandatory field"
    errorMessage = ""

    map(attributeKey: string|number|symbol) {
        this.usedAttributeKey = attributeKey
        return this
    }

    setLabel(label: string) {
        this.label.addMessage(label)
        return this
    }

    setValue(value: boolean) {
        this.value = value
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

    setRequired(value = true, errorMessage = "It is a mandatory field") {
        this.isRequired = value
        this.requiredErrorMessage = errorMessage
    }

    setAttributeKey(key: string) {
        this.usedAttributeKey = key
        return this
    }
}