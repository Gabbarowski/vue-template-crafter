import {Header} from "../Header/Header.ts";
import {Form} from "../Form/Form.ts";
import {Input} from "../Input/Input.ts";
import {FlexSizeManager} from "./FlexSizeManager.ts";
import {CssClassManager} from "./CssClassManager.ts";

export type BoardItemElement = Header|Form|Input

export interface BodyTemplateItem {
    uuid: string,
    flexSize: FlexSizeManager
    cssClasses: CssClassManager
}
export interface CssDefaultStyle {
    input: string,
    label: string,
    header: string,
    button: string,
    crafterWrapper: string
}