import TemplateCrafterHolder from "./components/TemplateCrafterHolder.vue";
import {Form} from "./components/Form/Form.ts";
import FormHolder from "./components/Form/FormHolder.vue";
import {createPinia} from 'pinia'
import { App } from 'vue'
import {useFormStore} from "./components/Form/formStore"

export { Form, useFormStore, TemplateCrafterHolder, FormHolder }

export default {
    install: (app: App) => {
        const pinia = createPinia()
        app.use(pinia)
    }
}