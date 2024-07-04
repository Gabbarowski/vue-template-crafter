import {useFormStore} from "../formStore.ts";

export class Form {

    header = "Hallo"

    constructor() {
        const formStore = useFormStore();
        formStore.register(this)
    }
}