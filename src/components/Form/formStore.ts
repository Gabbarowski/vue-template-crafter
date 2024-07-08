import {defineStore} from "pinia"
import {Form} from "./Form.ts";

export const useFormStore = defineStore('gabbarowski-form-store', {
    state: () => ({
        forms: [] as Form[]
    }),
    actions: {
        register(form: Form) {
            this.forms.push(form)
            console.log(this.forms)
        },
        test(test: string) {
            alert(test)
        }
    }

})