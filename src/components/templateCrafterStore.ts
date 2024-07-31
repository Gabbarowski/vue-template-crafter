import {defineStore} from "pinia"
import {Form} from "./Form/Form.ts";

import {StyleSettings} from "./Utility/StyleSettings.ts";
import {DefaultObject, ItemPreset} from "./Utility/ItemPreset.ts";

export const useTemplateCrafterStore = defineStore('gabbarowski-template-crafter-store', {
    state: () => ({
        forms: [] as Form[],
        styleSetting: new StyleSettings(),
        presets: [] as ItemPreset[]
    }),
    actions: {
        defaultSetting(newDefaultSetting: StyleSettings) {
            this.styleSetting = newDefaultSetting
        },
        savePreset<objectType extends DefaultObject>(presetName: string, bodyItem: objectType) {
            let preset = this.presets.find(obj => obj.name == presetName)
            if(!preset) {
                preset = new ItemPreset<objectType>()
            }
            preset.name = presetName
            preset.item = bodyItem
            this.presets.push(preset)
        },
        getPreset(presetName: string) {
            const preset = this.presets.find(obj => obj.name == presetName)
            if(!preset) {
                console.warn("Preset: " + presetName + " couldn't be found!");
                return null
            }
            return preset.getItem()
        }
    }

})