import CrafterTemplate from "./components/TemplateBoard/CrafterTemplate.vue";
import {Crafter} from "./components/TemplateBoard/Crafter.ts";
import {Form} from "./components/Form/Form.ts";
import FormHolder from "./components/Form/FormHolder.vue";
import {createPinia} from 'pinia'
import { App } from 'vue'
import "./style.scss"
import {useFormStore} from "./components/Form/formStore"

export { Form, useFormStore, CrafterTemplate, FormHolder, Crafter }

export default {
    install: (app: App) => {
        const pinia = createPinia()
        app.use(pinia)
    }
}