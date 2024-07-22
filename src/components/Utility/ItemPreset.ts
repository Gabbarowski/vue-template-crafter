import {v4} from "uuid";

export class ItemPreset <T extends object = DefaultObject> {
    uuid = v4()
    name = ""
    item = {} as T

    getItem() {
        return this.item
    }
}

export interface DefaultObject {
    [key: string]: any;
}
