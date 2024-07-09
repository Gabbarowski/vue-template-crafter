import {v4} from "uuid";
import {Label} from "../Label/Label.ts";

export class Input {
    uuid = v4()
    label = new Label()
    value = "" as string|number
    preValue = "" as string|number
    isMandatory = false
    constructor(label: string) {
        this.label.addMessage(label)
    }

    setValue(value: string|number) {
        this.preValue = value
        this.value = value
    }
}