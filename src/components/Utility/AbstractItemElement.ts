import { TemplatePosition} from "../Interfaces";
import {Crafter} from "../Crafter/Crafter";
import {CssClassManager} from "./CssClassManager";
import {DataTransfer} from "./DataTransfer";
import {FlexSizeManager} from "./FlexSizeManager";
import {v4} from "uuid";
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {StyleSettings} from "./StyleSettings";

export class AbstractItemElement {
    crafter = null as Crafter|null;
    cssClassesItem = new CssClassManager()
    cssClassesWrapper = new CssClassManager()
    cssClassesContainer = new CssClassManager()
    dataTransfer = new DataTransfer();
    enable = true as boolean;
    flexSize = new FlexSizeManager();
    uuid = ""
    visible = true as boolean;

    constructor() {
        this.uuid = v4()
    }

    /**
     * Get the style setting that is handled by the store
     */
    getStyleSettings():StyleSettings {
        const store = useTemplateCrafterStore();
        return store.styleSetting as StyleSettings
    }

    /**
     * Move your object to another place.
     * @param {TemplatePosition} container
     * @param position
     */
    move(container = "body" as TemplatePosition|string, position = "end" as "end"|"start"|"up"|"down"|number) {
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

    setCrafter(crafter: Crafter) {
        this.crafter = crafter
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

    setDisable(value: boolean = true): this {
        this.enable = !value;
        return this;
    }

    setEnable(value: boolean = true): this {
        this.enable = value;
        return this
    }

    setHidden(value: boolean = true): this {
        this.visible = !value
        return this
    }

    setVisible(value: boolean = true): this {
        this.visible = value
        return this;
    }

    /**
     * Set the width of your component for Mobile, Tablet and Desktop Size.
     * Set to null to ignore default settings or to revoke previously made settings
     * @param mobileWidth
     * @param tabletWidth
     * @param desktopWidth
     */
    setWidth(mobileWidth: string|null, tabletWidth: string|null = null, desktopWidth: string|null = null):this {
        this.flexSize.setWidth(mobileWidth, tabletWidth, desktopWidth)
        return this
    }

    /**
     * Set the min width of your component for Mobile, Tablet and Desktop Size.
     * @param mobileWidth
     * @param tabletWidth
     * @param desktopWidth
     */
    setMaxWidth(mobileWidth: string|null, tabletWidth: string|null = null, desktopWidth: string|null = null):this {
        this.flexSize.setMaxWidth(mobileWidth, tabletWidth, desktopWidth)
        return this
    }

    /**
     * Set the min width of your component for Mobile, Tablet and Desktop Size.
     * @param mobileWidth
     * @param tabletWidth
     * @param desktopWidth
     */
    setMinWidth(mobileWidth: string|null, tabletWidth: string|null = null, desktopWidth: string|null = null):this {
        this.flexSize.setMinWidth(mobileWidth, tabletWidth, desktopWidth)
        return this
    }

    /**
     * Add one or more Css Classes to the component
     * @param cssClass
     * @param position select the position of your class. NOTE: Not every item has wrapper or container classes
     */
    addCssClass(cssClass: string|string[], position = "item" as "item"|"wrapper"|"container") {
        if(position === "item") {
            this.cssClassesItem.addClass(cssClass)
        }
        if(position === "wrapper") {
            this.cssClassesItem.addClass(cssClass)
        }
        if(position === "container") {
            this.cssClassesItem.addClass(cssClass)
        }
        return this
    }

    /**
     * Remove one or more Css Classes from component
     * @param cssClass
     * @param position select the position of your class. NOTE: Not every item has wrapper or container classes
     */
    removeCssClass(cssClass: string|string[], position = "item" as "item"|"wrapper"|"container") {
        if(position === "item") {
            this.cssClassesItem.removeClass(cssClass)
        }
        if(position === "wrapper") {
            this.cssClassesItem.removeClass(cssClass)
        }
        if(position === "container") {
            this.cssClassesItem.removeClass(cssClass)
        }
        return this
    }
}