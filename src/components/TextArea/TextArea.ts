/*
 * Copyright (c) 2024. Daniel Grabasch
 * All rights reserved
 * This File is Part of Vue Template Crafter
 */

import {AbstractItemElement} from "../Utility/AbstractItemElement";
import {Label} from "../Label/Label";
import {reactive} from "vue";
import {UtilityFunctions} from "../Utility/UtilityFunctions";

export class TextArea extends AbstractItemElement {

    label = null as null|Label
    preValue = ""
    value = ""
    rows = 5
    cols = undefined as undefined|number
    validationFunctions: ((textArea: TextArea) => boolean)[] = [];
    validationErrorMessages: string[] = [];
    usedAttributeKey= null as null|string|number|symbol
    isResizableHorizontal = true
    isResizableVertical = true
    isValid = true
    errorMessage = ""
    isRequired = false
    requiredErrorMessage = ""

    constructor() {
        super();
        this.cssClassesItem.addClass(this.getStyleSettings().cssDefaultClass.textArea)
        this.cssClassesWrapper.addClass(this.getStyleSettings().cssDefaultClass.textAreaWrapper)
        this.cssClassesContainer.addClass(this.getStyleSettings().cssDefaultClass.textAreaContainer)
        this.flexSize.setWidth(
            this.getStyleSettings().itemDefaultWidth.textbox.mobileWidth,
            this.getStyleSettings().itemDefaultWidth.textbox.tabletWidth,
            this.getStyleSettings().itemDefaultWidth.textbox.desktopWidth,

        )
    }

    setValue(value: any) {
        this.preValue = value
        this.value = value
        return this
    }

    setLabel(message: string) {
        this.label = reactive(new Label()) as Label
        this.label.setMessage(message)
        return this
    }

    /**
     * Connect this item to the added object. The value can then be written automatically
     * @param attributeKey
     */
    map(attributeKey: string|number|symbol) {
        this.usedAttributeKey = attributeKey
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

    /**
     * Change the number of rows in your textarea
     * @param value
     */
    setRows(value: number) {
        this.rows = value
        return this
    }


    /**
     * Change the number of cols in your textarea
     * @param value
     */
    setCols(value: number): this {
        this.cols = value
        this.flexSize.setWidth(null, null, null)
        return this
    }

    setIsResizable(value = true as boolean|"horizontal"|"vertical"|"both"|"none") {
        if(value === true || value === "both") {
            this.isResizableHorizontal = true
            this.isResizableVertical = true
        }
        if(value === false || value === "none") {
            this.isResizableHorizontal = false
            this.isResizableVertical = false
        }
        if( value === "horizontal") {
            this.isResizableHorizontal = true
            this.isResizableVertical = false
        }
        if( value === "vertical") {
            this.isResizableHorizontal = false
            this.isResizableVertical = true
        }
        return this
    }

    /**
     * ONLY NEEDS FOR TEMPLATE!
     */
    getResizableStyle():string {
        if(this.isResizableHorizontal && this.isResizableVertical) {
            return ""
        }
        if(this.isResizableHorizontal && !this.isResizableVertical) {
            return "resize: horizontal;"
        }
        if(!this.isResizableHorizontal && this.isResizableVertical) {
            return "resize: vertical;"
        }
        return "resize: none;"
    }

    setRequired(value = true, errorMessage = "It is a mandatory field") {
        this.isRequired = value
        this.requiredErrorMessage = errorMessage
        return this;
    }

    addValidation(validationFunction: (textArea: TextArea) => boolean, errorMessage: string) {
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