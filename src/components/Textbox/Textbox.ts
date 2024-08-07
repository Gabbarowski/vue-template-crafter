import {Button} from "../Button/Button";
import {reactive} from "vue";
import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";

export class Textbox extends AbstractItemElement {
    actionButtons = [] as Button[]
    message = ""

    constructor(message: string) {
        super()
        this.cssClassesItem.addClass(this.getStyleSettings().cssDefaultClass.textbox)
        this.cssClassesWrapper.addClass(this.getStyleSettings().cssDefaultClass.textboxWrapper)
        this.flexSize.setWidth(
            this.getStyleSettings().itemDefaultWidth.textbox.mobileWidth,
            this.getStyleSettings().itemDefaultWidth.textbox.tabletWidth,
            this.getStyleSettings().itemDefaultWidth.textbox.desktopWidth
        )
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

}

