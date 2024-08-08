import {Label} from "../Label/Label";
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {reactive} from "vue";
import {Button} from "../Button/Button";
import {InputType} from "./InputType";
import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";
import {UtilityFunctions} from "../Utility/UtilityFunctions.ts";

export class Input extends AbstractItemElement {
    label = new Label()
    value = "" as string|number
    isValid: boolean = true;
    preValue = "" as string|number
    errorMessage = ""
    isRequired = false
    requiredErrorMessage = "It is a mandatory field"
    actionButtons = reactive<Button[]>([])
    validationFunctions: ((input: Input) => boolean)[] = [];
    validationErrorMessages: string[] = [];
    usedAttributeKey = null as null|string|number|symbol
    inputType = "text" as InputType

    constructor(label: string) {
        super()
        this.label.addMessage(label)
        this.cssClassesItem.addClass(this.getStyleSettings().cssDefaultClass.input)
        this.cssClassesWrapper.addClass(this.getStyleSettings().cssDefaultClass.inputWrapper)
        this.cssClassesContainer.addClass(this.getStyleSettings().cssDefaultClass.inputContainer)
        const inputWidth = this.getStyleSettings().itemDefaultWidth.input
        this.flexSize.setWidth(inputWidth.mobileWidth, inputWidth.tabletWidth, inputWidth.desktopWidth )
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
     * Determine which input type should be used. Note that, depending on the input type, further setting parameters
     * @param type
     */
    setInputType(type: InputType) {
        this.inputType = type

        // Add Email validation
        if(this.inputType === "email") {
            this.addValidation((input) => {
                const validRegex =   /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
                if(input.value === "") {
                    return true
                }
                return !!String(input.value).toLocaleLowerCase().match(validRegex);
            }
            , "Please enter a valid email address"
            )
        }

        // Add Phone validation
        if(this.inputType === "tel") {
            this.addValidation((input) => {
                    const validRegex =   /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9()]*$/g
                    if(input.value === "") {
                        return true
                    }
                    return !!String(input.value).toLocaleLowerCase().match(validRegex);
                }
                , "Please enter a valid phone or mobile number"
            )
        }

        // Value will initialize again. Because rules could be changed
        this.setValue(this.value)

        return this
    }

    setRequired(value = true, errorMessage = "It is a mandatory field") {
        this.isRequired = value
        this.requiredErrorMessage = errorMessage
    }

    addValidation(validationFunction: (input: Input) => boolean, errorMessage: string) {
        this.validationFunctions.push(validationFunction);
        this.validationErrorMessages.push(errorMessage);
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

    /**
     * Set value of the input component
     * In case of date please use following ISO 8601 "YYYY-MM-DD" or "YYYY-MM-DDThh:mm:ss+00:00" (for UTC)
     * @param {any} value
     */
    setValue(value: any) {
        /// Analyse if value is Date START
        let date = new Date()
        let noError = true
        if(this.inputType === "datetime-local" || this.inputType == "date" && typeof value === "string") {
            try {
                date = new Date(value)
                if (isNaN(date.getTime())) {
                    throw new Error('Invalid date');
                }
            }
            catch (error) {
                noError = false
                console.error("Date couldn't parse", error);
            }
        }

        if(this.inputType === "datetime-local" && typeof value === "string" && noError) {
            value = date.toISOString().slice(0, 16);
        }
        if(this.inputType === "date" && typeof value === "string" && noError) {
            value = date.toISOString().split('T')[0];
        }
        /// Analyse if value is Date END

        this.preValue = value
        this.value = value
    }

    /**
     * Add a Button for your Input item. It will be added in the input-wrapper element
     * @param label
     */
    addButton(label: string
    ): Button {
        const newBtn = reactive(new Button(label)) as Button
        this.actionButtons.push(newBtn)
        return newBtn as Button
    }

    /**
     * Get all Css Classes as a String
     */
    getCssClasses() {
        let cssClassString = ""
        const crafterStore = useTemplateCrafterStore();
        const styleSetting = crafterStore.styleSetting
        if(!this.isValid) {
            cssClassString += styleSetting.cssDefaultClass.alertBorder + " "
        }
        return cssClassString + this.cssClassesItem.toString()
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