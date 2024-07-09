import {defineStore} from "pinia"
import {Form} from "./Form/Form.ts";
import {StyleSettings} from "./Utility/Interfaces.ts";

export const useTemplateCrafterStore = defineStore('gabbarowski-template-crafter-store', {
    state: () => ({
        forms: [] as Form[],
        styleSetting: new StyleSettings()
    }),
    actions: {
        defaultSetting() {
        }
    }

})