import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";
import {CheckboxItem} from "./CheckboxItem.ts";
import {reactive} from "vue";
import {HandledObjectType} from "../Interfaces/ObjectHandleType.ts";

export class Checkbox  <T extends object = HandledObjectType> extends AbstractItemElement {

    topic: string = ""
    checkboxItems = [] as CheckboxItem[]
    constructor() {
        super();
    }

    setTopic(topic: string) {
        this.topic = topic
        return this
    }

    /**
     * Add a checkbox Item. It will be render in Checkbox wrapper
     * @param label
     * @param preValue
     */
    addCheckboxItem(label: string, preValue: boolean = false): CheckboxItem {
        const checkboxItem = reactive(new CheckboxItem()) as CheckboxItem;
        checkboxItem.setLabel(label)
        checkboxItem.setValue(preValue)
        this.checkboxItems.push(checkboxItem)
        return checkboxItem
    }

    /**
     * Add a checkbox Item. It will be render in Checkbox wrapper
     * @param label
     * @param {string|number|symbol} attributeKey Select the correct attribute name of your object
     */
    addCheckboxItemMapped(label: string, attributeKey: keyof T ): CheckboxItem {
        const checkboxItem = reactive(new CheckboxItem()) as CheckboxItem;
        checkboxItem.setLabel(label)
        checkboxItem.map(attributeKey)
        if(!this.crafter) return checkboxItem
        if(this.crafter.usedObject[attributeKey]) {
            checkboxItem.setValue(this.crafter.usedObject[attributeKey])
        }
        this.checkboxItems.push(checkboxItem)
        return checkboxItem
    }

    validate() {
        for(const checkboxItem of this.checkboxItems) {
            if (!checkboxItem.validate()) {
                return false
            }
        }
        return true
    }
}