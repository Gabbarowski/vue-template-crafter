import {defineStore} from "pinia"
import {Form} from "./Form/Form.ts";

import {StyleSettings} from "./Utility/StyleSettings.ts";

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