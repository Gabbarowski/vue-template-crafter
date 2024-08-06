import CrafterTemplate from "./components/Crafter/CrafterTemplate.vue";
import TemplateCrafterModal from "./components/Modal/TemplateCrafterModal.vue";
import {Crafter} from "./components/Crafter/Crafter";
import {CrafterPreset} from "./components/Crafter/CrafterPreset";
import {FactoryCrafter} from "./components/Crafter/FactoryCrafter";
import {AbstractItemElement} from "./components/Utility/AbstractItemElement"
import {Button} from "./components/Button/Button";
import {Input} from "./components/Input/Input";
import {Textbox} from "./components/Textbox/Textbox";
import {createPinia} from 'pinia'
import {App, Plugin } from 'vue'
import  "./styles/style.scss"
import {useTemplateCrafterStore} from "./components/templateCrafterStore";
import { StyleSettings } from "./components/Utility/StyleSettings"
import {TemplatePosition, BoardItemElement, CssDefaultStyle, ObjectHandleType} from "./components/Interfaces";

export {
    CrafterTemplate,
    TemplateCrafterModal,
    Crafter,
    CrafterPreset,
    FactoryCrafter,
    AbstractItemElement,
    useTemplateCrafterStore,
    StyleSettings,
    Button,
    Input,
    Textbox
}

export type {
    TemplatePosition,
    BoardItemElement,
    CssDefaultStyle,
    ObjectHandleType
}

const VueTemplatePlugin : Plugin  = {
    install: (app: App) => {
        const pinia = createPinia()
        app.use(pinia)
    }
}

export default VueTemplatePlugin;