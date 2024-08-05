import {FlexSizeManager} from "../Utility/FlexSizeManager";
import {CssClassManager} from "../Utility/CssClassManager";
import {Crafter} from "../TemplateBoard/Crafter";
import {DataTransfer} from "../Utility/DataTransfer";

/**
 * @typedef {object} BodyTemplateItem
 */
export interface BodyTemplateItem {
    uuid: string,
    flexSize: FlexSizeManager
    cssClasses: CssClassManager
    crafter: null|Crafter
    dataTransfer: DataTransfer
    enable: boolean
    setEnable(value: boolean = true): this
    setDisable(value: boolean = true): this
    visible: boolean
    setVisible(value: boolean = true): this
    setHidden(value: boolean = true): this
    isFirstItem(): boolean
    isLastItem(): boolean
}