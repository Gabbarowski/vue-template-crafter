import {v4} from "uuid";
import {Label} from "../Label/Label";
import {CssClassManager} from "../Utility/CssClassManager";
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {FlexSizeManager} from "../Utility/FlexSizeManager";
import {reactive} from "vue";
import {Button} from "../Button/Button";
import {BodyTemplateItem, TemplatePosition} from "../Interfaces";
import {Crafter} from "../Crafter/Crafter";
import {DataTransfer} from "../Utility/DataTransfer";
import {InputType} from "./InputType";

export class Input implements BodyTemplateItem {
    uuid = v4()
    label = new Label()
    value = "" as string|number
    isValid: boolean = true;
    preValue = "" as string|number
    errorMessage = ""
    isRequired = false
    requiredErrorMessage = "It is a mandatory field"
    cssClasses = new CssClassManager()
    flexSize = new FlexSizeManager()
    actionButtons = reactive<Button[]>([])
    validationFunctions: ((input: Input) => boolean)[] = [];
    validationErrorMessages: string[] = [];
    crafter = null as Crafter|null
    usedAttributeKey = null as null|string|number|symbol
    dataTransfer = new DataTransfer()
    enable = true
    visible = true
    inputType = "text" as InputType


    constructor(label: string) {
        const crafterStore = useTemplateCrafterStore();
        const styleSetting = crafterStore.styleSetting
        this.label.addMessage(label)
        this.cssClasses.addClass(styleSetting.cssDefaultClass.input)
        const inputWidth = styleSetting.itemDefaultWidth.input
        this.flexSize.setWidth(inputWidth.mobileWidth, inputWidth.tabletWidth, inputWidth.desktopWidth )
    }

    /**
     * Will be automatic set if you add the Button with Crafter Class
     * @param crafter
     */
    setCrafter(crafter: Crafter) {
        this.crafter = crafter
        return this
    }

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

    /**
     * Move your object to another place.
     * @param {TemplatePosition} container
     * @param position
     */
    move(container = "body" as TemplatePosition, position = "end" as "end"|"start"|"up"|"down"|number): Input {
        if(!this.crafter) {
            console.warn("No crafter found")
            return this;
        }
        this.crafter.moveItem(this, container, position)
        return this
    }

    /**
     * Remove Object from crafter
     */
    remove() {
        if(!this.crafter) {
            console.warn("No crafter found")
            return this;
        }
        this.crafter.removeItem(this)
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
        return cssClassString + this.cssClasses.toString()
    }

    /**
     * Deactivate the element
     * @param value
     */
    setDisable(value: boolean = true) {
        this.enable = !value
        return this
    }

    /**
     * Activate the element
     * @param value
     */
    setEnable(value: boolean = true) {
        this.enable = value
        return this
    }

    /**
     * Check whether the item is in the last position. The system automatically checks which template position the item is in.
     */
    isLastItem():boolean {
        if(!this.crafter) {
            console.warn("No crafter found")
            return false;
        }
        return this.crafter.isItemLast(this)
    }

    /**
     * Check whether the item is in the last position. The system automatically checks which template position the item is in.
     */
    isFirstItem():boolean {
        if(!this.crafter) {
            console.warn("No crafter found")
            return false;
        }
        return this.crafter.isItemFirst(this)
    }

    /**
     * Hide this item
     * @param value
     */
    setHidden(value = true): this {
        this.visible = !value
        return this
    }

    /**
     * Visible this item
     * @param value
     */
    setVisible(value = true): this {
        this.visible = value
        return this
    }
}