import {v4} from "uuid";
import {Header, HeaderTag} from "../Header/Header.ts";
import {Row} from "./Row.ts";
import {BoardItem} from "./BoardItem.ts";
import {Input} from "../Input/Input.ts";
import {CssClassManager} from "../Utility/CssClassManager.ts";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";

export class Crafter {
    uuid = v4()
    rows = [] as Row[]
    cssClass = new CssClassManager()


    addHeader(topic: string, headerTag: HeaderTag = "h3") {
        const crafterStore = useTemplateCrafterStore()
        const header = new Header(topic, headerTag)
        const borderItem = new BoardItem(header)
        const row = new Row()
        row.addBoardItem(borderItem)
        this.rows.push(row)
        this.cssClass.addClass(crafterStore.styleSetting.cssDefaultClass.crafterWrapper)
    }

    addInput(label: string, preValue: number|string) {
        const input = new Input(label);
        input.setValue(preValue)
        const borderItem = new BoardItem(input)
        const row = new Row()
        row.addBoardItem(borderItem)
        this.rows.push(row)
    }

}