import {AbstractItemElement} from "../Utility/AbstractItemElement";

export class Icon extends AbstractItemElement {

    mode = "class" as "class"|"svg"
    htmlTag = "i"
    icon = ""
    clickEvents = [] as (() => void)[]
    hasWrapper = false

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
        return this
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
        return this
    }

    /**
     * Determines which HTML tag is to be rendered. By default, it is <i>. In the case of svg mode, it is <img>
     * @param tag
     */
    setTag(tag: string) {
        this.htmlTag = tag
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

    includeWrapper(value = true) {
        this.hasWrapper = value
    }
}