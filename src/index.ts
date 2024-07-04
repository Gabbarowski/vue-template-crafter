import MyTest from "./components/MyTest.vue";
import {Form} from "./components/Form/Entity/Form.ts";
import {createPinia} from 'pinia'
import { App } from 'vue'
import {useFormStore} from "./components/Form/formStore"

export {MyTest, Form, useFormStore }

export default {
    install: (app: App) => {
        // Diese Funktion wird aufgerufen, wenn Pinia initialisiert wird

        // Fügen Sie den Store als globale Eigenschaft hinzu
        //app.config.globalProperties.$formStore = useFormStore()
        const pinia = createPinia()
        app.use(pinia)

    }
}