import CrafterTemplate from "./components/Crafter/CrafterTemplate.vue";
import TemplateCrafterModal from "./components/Modal/TemplateCrafterModal.vue";
import {Crafter} from "./components/Crafter/Crafter";
import {CrafterPreset} from "./components/Crafter/CrafterPreset";
import {FactoryCrafter} from "./components/Crafter/FactoryCrafter";
import {AbstractItemElement} from "./components/Utility/AbstractItemElement"
import {Button} from "./components/Button/Button";
import ButtonTemplate from "./components/Button/ButtonTemplate.vue";
import {Input} from "./components/Input/Input";
import InputContainerTemplate from "./components/Input/InputContainerTemplate.vue";
import DefaultInputTemplate from "./components/Input/DefaultInputTemplate.vue";
import {Select} from "./components/Select/Select"
import SelectTemplate from "./components/Select/SelectTemplate.vue"
import {Break} from "./components/Break/Break"
import BreakTemplate from "./components/Break/BreakTemplate.vue"
import {Textbox} from "./components/Textbox/Textbox";
import TextboxTemplate from "./components/Textbox/TextboxTemplate.vue";
import {createPinia} from 'pinia'
import {App, Plugin } from 'vue'
import  "./styles/style.scss"
import {useTemplateCrafterStore} from "./components/templateCrafterStore";
import { StyleSettings } from "./components/Utility/StyleSettings"
import {TemplatePosition, BoardItemElement, CssDefaultStyle, ObjectHandleType} from "./components/Interfaces";

export {
    CrafterTemplate,
    TemplateCrafterModal,
    SelectTemplate,
    BreakTemplate,
    ButtonTemplate,
    InputContainerTemplate,
    DefaultInputTemplate,
    TextboxTemplate,
    Crafter,
    CrafterPreset,
    FactoryCrafter,
    AbstractItemElement,
    useTemplateCrafterStore,
    StyleSettings,
    Button,
    Input,
    Textbox,
    Select,
    Break
}

export type {
    TemplatePosition,
    BoardItemElement,
    CssDefaultStyle,
    ObjectHandleType
}

const VueTemplateCrafter : Plugin  = {
    install: (app: App) => {
        const pinia = createPinia()
        app.use(pinia)
    }
}

export default VueTemplateCrafter;