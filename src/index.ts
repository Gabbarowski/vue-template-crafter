import CrafterTemplate from "./components/TemplateBoard/CrafterTemplate.vue";
import TemplateCrafterModal from "./components/Modal/TemplateCrafterModal.vue";
import {Crafter} from "./components/TemplateBoard/Crafter";
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";
import {Textbox} from "./components/Textbox/Textbox";
import {createPinia} from 'pinia'
import {App, Plugin } from 'vue'
import  "./styles/style.scss"
import {useTemplateCrafterStore} from "./components/templateCrafterStore";
import { StyleSettings } from "./components/Utility/StyleSettings"
import {TemplatePosition, BodyTemplateItem, BoardItemElement, CssDefaultStyle} from "./components/Interfaces";

export {
    CrafterTemplate,
    TemplateCrafterModal,
    Crafter,
    useTemplateCrafterStore,
    StyleSettings,
    Button,
    Input,
    Textbox
}

export type {
    TemplatePosition,
    BodyTemplateItem,
    BoardItemElement,
    CssDefaultStyle
}

const VueTemplatePlugin : Plugin  = {
    install: (app: App) => {
        const pinia = createPinia()
        app.use(pinia)
    }
}

export default VueTemplatePlugin;