import {v4} from "uuid";
import {Label} from "../Label/Label.ts";
import {CssClassManager} from "../Utility/CssClassManager.ts";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import {FlexSizeManager} from "../Utility/FlexSizeManager.ts";
import {reactive} from "vue";
import {Button} from "../Button/Button.ts";
import {BodyTemplateItem, TemplatePosition} from "../Utility/Interfaces.ts";
import {Crafter} from "../TemplateBoard/Crafter.ts";

export class Input implements BodyTemplateItem{
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

    constructor(label: string) {
        const crafterStore = useTemplateCrafterStore();
        const styleSetting = crafterStore.styleSetting
        this.label.addMessage(label)
        this.cssClasses.addClass(styleSetting.cssDefaultClass.input)
        const inputWidth = styleSetting.itemDefaultWidth.input
        this.flexSize.setWidth(inputWidth.mobileWidth, inputWidth.tabletWidth, inputWidth.desktopWidth )
    }

    setCrafter(crafter: Crafter) {
        this.crafter = crafter
    }

    move(container = "body" as TemplatePosition, position = "end" as "end"|"start"|"up"|"down"|number) {
        if(!this.crafter) {
            console.warn("No crafter found")
            return;
        }
        this.crafter.moveItem(this, container, position)
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

    setValue(value: string|number) {
        this.preValue = value
        this.value = value
    }

    addButton(label: string,
              cssClass = null as null|string|string[],
              onClickEvent: (() => void) | null = null,
              ignoreValidation = false
    ) {
        const newBtn = reactive(new Button(label)) as Button
        if(cssClass) newBtn.cssClasses.addClass(cssClass)
        if(onClickEvent) newBtn.onClick(onClickEvent)
        newBtn.setIgnoreValidation(ignoreValidation)
        this.actionButtons.push(newBtn)
        return newBtn
    }

    /**
     * Get all Css Klasses as a String
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
}