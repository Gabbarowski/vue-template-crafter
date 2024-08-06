
/*
 * Copyright (c) 2024. Daniel Grabasch
 * All rights reserved
 * This File is Part of Vue Template Crafter
 */
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";

/**
 * Managed the possible CSS ClassList of all Template Crafter Item
 */
export class Button extends AbstractItemElement {
    label = ""
    clickEvents = [] as (() => void)[]
    ignoreValidation = false
    style = null as string|null
    isLoading = false
    icon = null as null|string

    /**
     * Execute clickEvent when the Enter key has been pressed in an input field
     */
    inputKeyEnterExecution = false


    constructor(label = "") {
        super()
        const crafterStore = useTemplateCrafterStore();
        const styleSetting = crafterStore.styleSetting
        this.label = label
        this.cssClasses.addClass(styleSetting.cssDefaultClass.button)
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
            this.cssClasses.removeClass(this.style)
        }
        const crafterStore = useTemplateCrafterStore();
        const styleSetting = crafterStore.styleSetting
        this.style = styleSetting.cssDefaultClass.buttonStylePrefix + style
        this.cssClasses.addClass(this.style)
        return this
    }

    onClick(clickEvent = () => {}) {
        this.clickEvents.push(clickEvent)
        return this
    }

    /**
     * Executes all registered click events
     */
    triggerClickEvents() {
        for(const event of this.clickEvents) {
            event()
        }
    }

    setIgnoreValidation(value = true) {
        this.ignoreValidation = value
        return this
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
     * @param {string} iconClass e.g. "fa-solid fa-floppy-disk"
     */
    setIcon(iconClass: string|null): this {
        this.icon = iconClass
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