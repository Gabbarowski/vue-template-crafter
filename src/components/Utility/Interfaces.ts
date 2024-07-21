import {Header} from "../Header/Header.ts";
import {Form} from "../Form/Form.ts";
import {Input} from "../Input/Input.ts";
import {FlexSizeManager} from "./FlexSizeManager.ts";

export type BoardItemElement = Header|Form|Input

export class StyleSettings {
    cssDefaultClass = {} as CssDefaultClass

    constructor () {
        this.cssDefaultClass = {} as CssDefaultClass
        this.cssDefaultClass.input = "c-input"
        this.cssDefaultClass.label = "c-label"
        this.cssDefaultClass.header = "c-label"
        this.cssDefaultClass.crafterWrapper = "c-container-default"

    }
}

interface CssDefaultClass {
    input: string,
    label: string,
    header: string,
    crafterWrapper: string
}

export interface BodyTemplateItem {
    uuid: string,
    flexSize: FlexSizeManager
}