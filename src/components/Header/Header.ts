import {CssClassManager} from "../Utility/CssClassManager.ts";

/**
 * Copyright (c) 2024 Daniel Grabasch
 * All rights reserved
 * This File is Part of Vue Template Crafter
 * Managed Header Elements of many Crafter Templates
 */
export class Header {
    title = ""
    headerTag = "h1" as HeaderTag
    cssClass: CssClassManager = new CssClassManager()

    constructor(title: string, headerTag = "h1" as HeaderTag) {
        this.title = title
        this.headerTag = headerTag
    }
}

export type HeaderTag = "h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"h7";