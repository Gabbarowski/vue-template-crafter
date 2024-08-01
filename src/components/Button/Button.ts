
import {BodyTemplateItem} from "./../Utility/Interfaces";
import {v4} from "uuid";
import {CssClassManager} from "../Utility/CssClassManager";
import {FlexSizeManager} from "../Utility/FlexSizeManager";
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {Crafter} from "../TemplateBoard/Crafter";
import {TemplatePosition} from "../Interfaces/TemplatePosition.ts";

/**
 * Copyright (c) 2024 Daniel Grabasch
 * All rights reserved
 * This File is Part of Vue Template Crafter
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

    setCrafter(crafter: Crafter) {
        this.crafter = crafter
        return this
    }

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