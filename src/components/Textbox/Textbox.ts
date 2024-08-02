import {BodyTemplateItem, TemplatePosition} from "../Interfaces";
import {Crafter} from "../TemplateBoard/Crafter.ts";
import {CssClassManager} from "../Utility/CssClassManager.ts";
import {FlexSizeManager} from "../Utility/FlexSizeManager.ts";
import {v4} from "uuid";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import {Button} from "../Button/Button.ts";
import {reactive} from "vue";

export class Textbox implements BodyTemplateItem {
    uuid= v4()
    crafter = null as Crafter | null;
    cssClasses = new CssClassManager();
    flexSize = new FlexSizeManager();
    actionButtons = [] as Button[]
    message = ""

    constructor(message: string) {
        const store = useTemplateCrafterStore();
        this.cssClasses.addClass(store.styleSetting.cssDefaultClass.textbox)
        this.message = message
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

}

