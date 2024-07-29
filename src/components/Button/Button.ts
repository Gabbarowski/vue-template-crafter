
import {BodyTemplateItem} from "../Utility/Interfaces.ts";
import {v4} from "uuid";
import {CssClassManager} from "../Utility/CssClassManager.ts";
import {FlexSizeManager} from "../Utility/FlexSizeManager.ts";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";

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

    onClick(clickEvent = () => {}) {
        this.clickEvent = clickEvent
    }

    setIgnoreValidation(value = true) {
        this.ignoreValidation = value
    }

}