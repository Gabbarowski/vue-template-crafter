import { TemplatePosition} from "../Interfaces";
import {Crafter} from "../Crafter/Crafter";
import {CssClassManager} from "./CssClassManager";
import {DataTransfer} from "./DataTransfer";
import {FlexSizeManager} from "./FlexSizeManager";
import {v4} from "uuid";

export class AbstractItemElement {
    crafter = null as Crafter|null;
    cssClasses = new CssClassManager();
    dataTransfer = new DataTransfer();
    enable = true as boolean;
    flexSize = new FlexSizeManager();
    uuid = ""
    visible = true as boolean;

    constructor() {
        this.uuid = v4()
    }

    /**
     * Move your object to another place.
     * @param {TemplatePosition} container
     * @param position
     */
    move(container = "body" as TemplatePosition, position = "end" as "end"|"start"|"up"|"down"|number) {
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

}