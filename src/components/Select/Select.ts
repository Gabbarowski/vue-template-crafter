import {AbstractItemElement} from "../Utility/AbstractItemElement.ts";
import {Label} from "../Label/Label.ts";

interface OptionItem {
    label: string,
    value: any,
    disable: boolean
}

export class Select extends AbstractItemElement {
    label = null as null|Label;
    value = "" as any
    options = [] as OptionItem[]
    constructor() {
        super();
        this.flexSize.setWidth(
            this.getStyleSettings().itemDefaultWidth.input.mobileWidth,
            this.getStyleSettings().itemDefaultWidth.input.tabletWidth,
            this.getStyleSettings().itemDefaultWidth.input.desktopWidth
            )
        this.cssClassesContainer.addClass(this.getStyleSettings().cssDefaultClass.selectContainer)
        this.cssClassesWrapper.addClass(this.getStyleSettings().cssDefaultClass.selectWrapper)
        this.cssClassesItem.addClass(this.getStyleSettings().cssDefaultClass.select)
    }

    addLabel(message: string): this {
        this.label = new Label();
        this.label.addMessage(message)
        return this
    }

    setValue(value: any) {
        this.value = value
        return this
    }

    addOption(optionLabel: string, value: any|null = null, disable = false) {
        if(value === null) {
            value = optionLabel
        }
        const option = {
            label: optionLabel,
            value: value,
            disable: disable
        }
        this.options.push(option)
    }
}