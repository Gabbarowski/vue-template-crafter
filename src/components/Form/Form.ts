import {useFormStore} from "./formStore";
import {Header, HeaderTag} from "../Header/Header";
import {CssClassManager} from "../Utility/CssClassManager";
import {v4} from "uuid"
import {Crafter} from "../TemplateBoard/Crafter";

export class Form {
    uuid = v4()
    header = undefined as Header|undefined
    cssClass: CssClassManager = new CssClassManager()
    private crafter: Crafter;


    constructor() {
        const formStore = useFormStore();
        formStore.register(this)
        this.crafter = new Crafter()
    }

    getTemplateData() {
        return this.crafter
    }

    addHeader(title: string, headerTag = "h3" as HeaderTag) {
        this.header = new Header(title, headerTag)
        return this
    }
}

export class FormItem {
    uuid  = v4()
}