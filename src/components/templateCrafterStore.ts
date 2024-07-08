import {defineStore} from "pinia"
import {Form} from "./Form/Form.ts";

export const useTemplateCrafterStore = defineStore('gabbarowski-template-crafter-store', {
    state: () => ({
        forms: [] as Form[]
    }),
    actions: {
        register() {
        }
    }

})