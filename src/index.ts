import CrafterTemplate from "./components/TemplateBoard/CrafterTemplate.vue";
import {Crafter} from "./components/TemplateBoard/Crafter";
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";
import {Form} from "./components/Form/Form";
import FormHolder from "./components/Form/FormHolder.vue";
import {createPinia} from 'pinia'
import {App, Plugin } from 'vue'
import "./style.scss"
import {useFormStore} from "./components/Form/formStore"
import {useTemplateCrafterStore} from "./components/templateCrafterStore";
import { StyleSettings } from "./components/Utility/StyleSettings"
import { BodyTemplateItem, BoardItemElement } from "./components/Utility/Interfaces";
import type {TemplatePosition} from "./components/Interfaces/TemplatePosition";

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

export type {
    TemplatePosition,
    BodyTemplateItem,
    BoardItemElement
}

const VueTemplatePlugin : Plugin  = {
    install: (app: App) => {
        const pinia = createPinia()
        app.use(pinia)
    }
}

export default VueTemplatePlugin;