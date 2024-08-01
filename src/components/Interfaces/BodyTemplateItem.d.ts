import {FlexSizeManager} from "../Utility/FlexSizeManager.ts";
import {CssClassManager} from "../Utility/CssClassManager.ts";
import {Crafter} from "../TemplateBoard/Crafter.ts";

/**
 * @typedef {object} BodyTemplateItem
 */
export interface BodyTemplateItem {
    uuid: string,
    flexSize: FlexSizeManager
    cssClasses: CssClassManager
    crafter: null|Crafter
}