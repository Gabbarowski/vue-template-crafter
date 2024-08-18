import {AbstractItemElement} from "../Utility/AbstractItemElement";
import {Label} from "../Label/Label";
import {UtilityFunctions} from "../Utility/UtilityFunctions";

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
    isValid = true
    isRequired = false
    errorMessage = ""
    requiredErrorMessage = ""
    validationFunctions: ((select: Select) => boolean)[] = [];
    validationErrorMessages: string[] = [];

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

    addOption(optionLabel: string, value: any|null = null, disable = false as boolean) {
        if(value === null) {
            value = optionLabel
        }
        const option = {
            label: optionLabel,
            value: value,
            disable: disable
        }
        this.options.push(option)
        return this
    }

    addOptionArray<T>(allOptions: { [key: string]: any }[], labelKey: string|((option: T) => string) , isDisable: null|((option: T) => boolean) = null) {
        for (const option of allOptions) {
            let isDisableResult = false
            if(isDisable !== null) {
                isDisableResult = isDisable(option as T)
            }
            if(typeof labelKey === "string") {
                this.addOption(option[labelKey], option, isDisableResult)
            } else {
                this.addOption(labelKey(option as T), option, isDisableResult)
            }
        }
        return this
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

    setRequired(value = true, errorMessage = "It is a mandatory field") {
        this.isRequired = value
        this.requiredErrorMessage = errorMessage
        return this
    }

    addValidation(validationFunction: (select: Select) => boolean, errorMessage: string) {
        this.validationFunctions.push(validationFunction);
        this.validationErrorMessages.push(errorMessage);
        return this;
    }

    validate() {
        this.isValid = true
        this.errorMessage = '';
        let index = 0

        if(this.isRequired && (this.value === "" || this.value === null)) {
            this.isValid = false
            this.errorMessage = this.requiredErrorMessage
        }

        for(const validationFunction of this.validationFunctions) {
            this.isValid = validationFunction(this);
            if (!this.isValid) {
                this.errorMessage = this.validationErrorMessages[index];
            }
            index++
        }
        return this.isValid;
    }
}
