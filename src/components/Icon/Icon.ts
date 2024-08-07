import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";

export class Icon extends AbstractItemElement {

    mode = "class" as "class"|"svg"
    htmlTag = "i"
    icon = ""

    constructor() {
        super();
    }

    /**
     * Changes the operating mode of the icon.
     * class => (DEFAULT) Renders a html tag e.g. <i> or <div>. The icon can be selected via the class.
     * svg => Renders an image tag <img> and enables the integration of an SVG file via a source specification
     * @param mode
     */
    setMode(mode: "class"|"svg" = "class") {
        this.mode = mode
        if(mode === "svg") {
            this.setTag("img")
        }
    }

    /**
     * Set the icon name or the svg source reference
     * class mode => e.g. "fa-solid fa-floppy-disk"
     * svg mode => e.g. "/asset/image/floppy-disk.svg"
     * @param icon
     */
    setIcon(icon: string) {
        this.icon = icon
        if(this.mode === "class") {
            this.cssClassesItem.addClass(icon)
        }
    }

    /**
     * Determines which HTML tag is to be rendered. By default, it is <i>. In the case of svg mode, it is <img>
     * @param tag
     */
    setTag(tag: string) {
        this.htmlTag = tag
    }
}