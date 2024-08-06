
/*
 * Copyright (c) 2024. Daniel Grabasch
 * All rights reserved
 * This File is Part of Vue Template Crafter
 */

import {BodyTemplateItem, TemplatePosition} from "./../Interfaces";
import {v4} from "uuid";
import {CssClassManager} from "../Utility/CssClassManager";
import {FlexSizeManager} from "../Utility/FlexSizeManager";
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {Crafter} from "../Crafter/Crafter";
import {DataTransfer} from "../Utility/DataTransfer";

/**
 * Managed the possible CSS ClassList of all Template Crafter Item
 */
export class Button implements BodyTemplateItem {
    uuid = v4()
    cssClasses = new CssClassManager()
    flexSize = new FlexSizeManager()
    label = ""
    clickEvents = [] as (() => void)[]
    ignoreValidation = false
    crafter = null as null|Crafter
    style = null as string|null
    dataTransfer = new DataTransfer()
    enable = true
    visible = true
    isLoading = false
    icon = null as null|string
    /**
     * Execute clickEvent when the Enter key has been pressed in an input field
     */
    inputKeyEnterExecution = false


    constructor(label = "") {
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
     * Will be automatic set if you add the Button with Crafter Class
     * @param crafter
     */
    setCrafter(crafter: Crafter) {
        this.crafter = crafter
        return this
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

    /**
     * Move your object to another place.
     * @param {TemplatePosition} container
     * @param position
     */
    move(container = "body" as TemplatePosition, position = "end" as "end"|"start"|"up"|"down"|number):Button {
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