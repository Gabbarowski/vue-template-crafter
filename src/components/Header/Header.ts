import {CssClassManager} from "../Utility/CssClassManager";
import {v4} from "uuid";
import {BodyTemplateItem} from "../Interfaces";
import {FlexSizeManager} from "../Utility/FlexSizeManager.ts";
import {DataTransfer} from "../Utility/DataTransfer.ts";
import {Crafter} from "../TemplateBoard/Crafter.ts";

/**
 * Copyright (c) 2024 Daniel Grabasch
 * All rights reserved
 * This File is Part of Vue Template Crafter
 * Managed Header Elements of many Crafter Templates
 */
export class Header implements BodyTemplateItem {
    uuid = v4()
    title = ""
    headerTag = "h1" as HeaderTag
    cssClasses: CssClassManager = new CssClassManager()
    flexSize = new FlexSizeManager()
    dataTransfer = new DataTransfer()
    crafter = null as null|Crafter
    enable = true
    visible = true

    constructor(title: string, headerTag = "h1" as HeaderTag) {
        this.title = title
        this.headerTag = headerTag
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

export type HeaderTag = "h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"h7";