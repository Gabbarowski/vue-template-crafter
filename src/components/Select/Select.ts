import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";
import {Label} from "../Label/Label.ts";
import {UtilityFunctions} from "../Utility/UtilityFunctions.ts";

interface OptionItem {
    label: string,
    value: any,
    disable: boolean
}

export class Select extends AbstractItemElement {
    label = null as null|Label;
    value = "" as any
    preValue = "" as any
    options = [] as OptionItem[]
    usedAttributeKey = null as null|number|symbol|string

    constructor() {
        super();
        this.flexSize.setWidth(
            this.getStyleSettings().itemDefaultWidth.input.mobileWidth,
            this.getStyleSettings().itemDefaultWidth.input.tabletWidth,
            this.getStyleSettings().itemDefaultWidth.input.desktopWidth
            )
        this.cssClassesContainer.addClass(this.getStyleSettings().cssDefaultClass.selectContainer)
        this.cssClassesWrapper.addClass(this.getStyleSettings().cssDefaultClass.selectWrapper)
        this.cssClassesItem.addClass(this.getStyleSettings().cssDefaultClass.select)
    }

    /**
     * Connect this item to the added object. The value can then be written automatically
     * @param attributeKey
     */
    map(attributeKey: string|number|symbol) {
        this.usedAttributeKey = attributeKey
        if(this.crafter && this.crafter.usedObject) {
            const value = this.crafter.usedObject[this.usedAttributeKey]
            if(value !== undefined) this.setValue(value)
        }
        return this
    }

    addLabel(message: string): this {
        this.label = new Label();
        this.label.addMessage(message)
        return this
    }

    setValue(value: any) {
        this.value = value
        this.preValue = value
        return this
    }

    addOption(optionLabel: string, value: any|null = null, disable = false) {
        if(value === null) {
            value = optionLabel
        }
        const option = {
            label: optionLabel,
            value: value,
            disable: disable
        }
        this.options.push(option)
    }

    addOptionArray<T>(allOptions: { [key: string]: any }[], labelKey: string|((option: T) => string) ) {
        for (const option of allOptions) {
            if(typeof labelKey === "string") {
                this.addOption(option[labelKey], option)
            } else {
                this.addOption(labelKey(option as T), option)
            }
        }
    }

    /**
     * Is Data changed?
     * @return True => The value differs from the initial value
     */
    isChanged() {
        return !UtilityFunctions.deepEqual(this.preValue, this.value)
    }

    /**
     * Will reset the preValue to the current value
     */
    resetPreValue() {
        this.preValue = this.value
        return this
    }
}
