
import {BodyTemplateItem, TemplatePosition} from "../Utility/Interfaces.ts";
import {v4} from "uuid";
import {CssClassManager} from "../Utility/CssClassManager.ts";
import {FlexSizeManager} from "../Utility/FlexSizeManager.ts";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import {Crafter} from "../TemplateBoard/Crafter.ts";

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
    clickEvent = null as (() => void) | null
    ignoreValidation = false
    crafter = null as null|Crafter

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
    }

    move(container = "body" as TemplatePosition, position = "end" as "end"|"start"|"up"|"down"|number) {
        if(!this.crafter) {
            console.warn("No crafter found")
            return;
        }
        this.crafter.moveItem(this, container, position)
        return this
    }

    onClick(clickEvent = () => {}) {
        this.clickEvent = clickEvent
    }

    setIgnoreValidation(value = true) {
        this.ignoreValidation = value
    }

}