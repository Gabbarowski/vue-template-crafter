import {BodyTemplateItem, TemplatePosition} from "../Interfaces";
import {Crafter} from "../Crafter/Crafter";
import {CssClassManager} from "../Utility/CssClassManager";
import {FlexSizeManager} from "../Utility/FlexSizeManager";
import {v4} from "uuid";
import {useTemplateCrafterStore} from "../templateCrafterStore";
import {Button} from "../Button/Button";
import {reactive} from "vue";
import {DataTransfer} from "../Utility/DataTransfer";

export class Textbox implements BodyTemplateItem {
    uuid= v4()
    crafter = null as Crafter | null;
    cssClasses = new CssClassManager();
    flexSize = new FlexSizeManager();
    actionButtons = [] as Button[]
    message = ""
    dataTransfer = new DataTransfer()
    enable = true
    visible = true

    constructor(message: string) {
        const store = useTemplateCrafterStore();
        this.cssClasses.addClass(store.styleSetting.cssDefaultClass.textbox)
        this.flexSize.setWidth(
            store.styleSetting.itemDefaultWidth.textbox.mobileWidth,
            store.styleSetting.itemDefaultWidth.textbox.tabletWidth,
            store.styleSetting.itemDefaultWidth.textbox.desktopWidth
        )
        this.message = message
    }

    /**
     * Will be automatic set if you add the Button with Crafter Class
     * @param crafter
     */
    setCrafter(crafter: Crafter) {
        this.crafter = crafter
        return this
    }

    /**
     * Add a Button for your textbox item. It will be added in the textbox-wrapper element
     * @param label
     */
    addButton(label: string): Button {
        const newBtn = reactive(new Button(label)) as Button
        this.actionButtons.push(newBtn)
        return newBtn as Button
    }

    /**
     * Move your object to another place.
     * @param {TemplatePosition} container
     * @param position
     */
    move(container = "body" as TemplatePosition, position = "end" as "end"|"start"|"up"|"down"|number):Textbox {
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

