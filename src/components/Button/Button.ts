
/*
 * Copyright (c) 2024. Daniel Grabasch
 * All rights reserved
 * This File is Part of Vue Template Crafter
 */
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {AbstractItemElement} from "../Utility/AbstractItemElement";
import {Icon} from "../Icon/Icon";

/**
 * Managed the possible CSS ClassList of all Template Crafter Item
 */
export class Button extends AbstractItemElement {
    label = ""
    clickEvents = [] as ((button: Button) => void)[]
    validClickEvents = [] as ((button: Button) => void)[]
    style = null as string|null
    isLoading = false
    icon = null as null|Icon

    /**
     * Execute clickEvent when the Enter key has been pressed in an input field
     */
    inputKeyEnterExecution = false


    constructor(label = "") {
        super()
        const styleSetting = this.getStyleSettings()
        this.label = label
        this.cssClassesItem.addClass(styleSetting.cssDefaultClass.button)
        this.flexSize.setWidth(
            styleSetting.itemDefaultWidth.button.mobileWidth,
            styleSetting.itemDefaultWidth.button.tabletWidth,
            styleSetting.itemDefaultWidth.button.desktopWidth
        )
    }

    /**
     * There are typically two classes for buttons.
     * The first class decides on the general styling and the second on the colour, e.g. primary, secondary etc.
     *
     * You can use the standard configuration to determine both the first class and the second class.
     * The advantage of setStyle is that you can change the colours later.
     * As it automatically links the appropriate prefix and removes the class.
     * @param {string} style e.g. "primary" or "secondary"
     */
    setStyle(style: string) {
        if(this.style) {
            this.cssClassesItem.removeClass(this.style)
        }
        const crafterStore = useTemplateCrafterStore();
        const styleSetting = crafterStore.styleSetting
        this.style = styleSetting.cssDefaultClass.buttonStylePrefix + style
        this.cssClassesItem.addClass(this.style)
        return this
    }

    onClick(clickEvent: (button: Button) => void) {
        this.clickEvents.push(clickEvent)
        return this
    }

    onValidClick(clickEvent: (button: Button) => void): this {
        this.validClickEvents.push(clickEvent)
        return this
    }

    /**
     * Executes all registered click events
     */
    triggerClickEvents() {
        for(const event of this.clickEvents) {
            event(this)
        }
        /// If the crafter no integrated. Ignore the validation and run all validClickEvents
        if(this.crafter && this.validClickEvents.length >= 0) {
            if(!this.crafter.validate()) {
                return
            }
        }
        for(const event of this.validClickEvents) {
            event(this)
        }
    }

    /**
     * Determines whether the button should display the charging status
     * @param {boolean} value True => Spinner will visible
     */
    setIsLoading(value: boolean = true): this {
        this.isLoading = value
        return this
    }

    /**
     * Set an icon in front of the label field in the button. This is integrated using <i class="iconClass"></i>
     * @param {string} iconClassOrSource e.g. "fa-solid fa-floppy-disk" or "/asset/image/floppy-disk.svg"
     * @param mode Changes the operating mode of the icon.
     * @return {Button} You get the Icon Element for more changes if you need
     */
    setIcon(iconClassOrSource: string, mode: "svg"|"class" = "class"): this {
        this.icon = new Icon()
        this.icon.setMode(mode)
        this.icon.setIcon(iconClassOrSource)
        return this
    }

    /**
     * Execute clickEvent when the Enter key has been pressed in an input field
     * @param {boolean} value True execute if someone press enter on input field
     */
    setInputKeyEnterExecution(value: boolean = true): this {
        this.inputKeyEnterExecution = value
        return this
    }

}