import {Header} from "../Header/Header.ts";
import {Form} from "../Form/Form.ts";
import {Input} from "../Input/Input.ts";
import {FlexSizeManager} from "./FlexSizeManager.ts";
import {CssClassManager} from "./CssClassManager.ts";
import {Button} from "../Button/Button.ts";
import {Crafter} from "../TemplateBoard/Crafter.ts";

export type BoardItemElement = Header|Form|Input|Button
export type TemplatePosition = "body"|"footerRight"|"footerLeft"

export interface BodyTemplateItem {
    uuid: string,
    flexSize: FlexSizeManager
    cssClasses: CssClassManager
    crafter: null|Crafter
}
export interface CssDefaultStyle {
    input: string,
    label: string,
    header: string,
    button: string,
    crafterWrapper: string
    alertBorder: string
    alertMessage: string
}