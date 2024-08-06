import {v4} from "uuid";
import {BodyTemplateItem} from "../Interfaces";
import {FlexSizeManager} from "../Utility/FlexSizeManager";
import {Crafter} from "../Crafter/Crafter";
import {CssClassManager} from "../Utility/CssClassManager";
import {DataTransfer} from "../Utility/DataTransfer";


export class Label implements BodyTemplateItem{
    message = ""
    uuid = v4()
    cssClasses = new CssClassManager()
    flexSize = new FlexSizeManager()
    crafter = null as Crafter|null
    dataTransfer = new DataTransfer()
    enable = true
    visible = true;

    addMessage(message:string) {
        this.message = message
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