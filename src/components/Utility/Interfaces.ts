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
    input: string, // Class for all input tags
    inputWrapper: string, // Class for input wrapper incl. action Buttons
    inputFloatingWrapper: string, // Class for input wrapper only input and label
    label: string, // Class for all labels
    header: string, // Class for all headers
    button: string, // Class for all buttons
    buttonStylePrefix: string // style Prefix for button e.g. for Bootstrap 5  => "btn-" | Allows you to work easier with Buttons styles
    buttonDefaultStyle: string // The style which will automatically include e.g. "primary" or "secondary" or "ghost-primary"
    alertBorder: string // Define border for inputs which has error or missing value
    alertMessage: string // Define the massaging box for inputs wrapper which has error or missing value
    crafterWrapper: string // Main Class for complete crafter template
}