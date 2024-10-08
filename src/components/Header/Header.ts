import {AbstractItemElement} from "../Utility/AbstractItemElement";

/**
 * Copyright (c) 2024 Daniel Grabasch
 * All rights reserved
 * This File is Part of Vue Template Crafter
 * Managed Header Elements of many Crafter Templates
 */
export class Header extends AbstractItemElement {
    title = ""
    headerTag = "h1" as HeaderTag

    constructor(title: string, headerTag = "h1" as HeaderTag) {
        super()
        this.cssClassesItem.addClass(this.getStyleSettings().cssDefaultClass.header)
        this.flexSize.setWidth("100%")
        this.title = title
        this.headerTag = headerTag
    }

}

export type HeaderTag = "h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"h7";