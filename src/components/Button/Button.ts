
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
import {Crafter} from "../TemplateBoard/Crafter";

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
    move(container = "body" as TemplatePosition, position = "end" as "end"|"start"|"up"|"down"|number) {
        if(!this.crafter) {
            console.warn("No crafter found")
            return;
        }
        this.crafter.moveItem(this, container, position)
        return this
    }

    onClick(clickEvent = () => {}) {
        this.clickEvents.push(clickEvent)
        return this
    }

    setIgnoreValidation(value = true) {
        this.ignoreValidation = value
        return this
    }

}