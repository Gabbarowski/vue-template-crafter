import CrafterTemplate from "./components/TemplateBoard/CrafterTemplate.vue";
import {Crafter} from "./components/TemplateBoard/Crafter.ts";
import {Button} from "./components/Button/Button.ts";
import {Input} from "./components/Input/Input.ts";
import {Form} from "./components/Form/Form.ts";
import FormHolder from "./components/Form/FormHolder.vue";
import {createPinia} from 'pinia'
import {App, Plugin } from 'vue'
import "./style.scss"
import {useFormStore} from "./components/Form/formStore"
import {useTemplateCrafterStore} from "./components/templateCrafterStore.ts";
import { StyleSettings } from "./components/Utility/StyleSettings.ts"

export {
    Form,
    useFormStore,
    CrafterTemplate,
    FormHolder,
    Crafter,
    useTemplateCrafterStore,
    StyleSettings,
    Button,
    Input
}


const VueTemplatePlugin : Plugin  = {
    install: (app: App) => {
        const pinia = createPinia()
        app.use(pinia)
    }
}

export default VueTemplatePlugin;