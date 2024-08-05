import {defineStore} from "pinia"

import {StyleSettings} from "./Utility/StyleSettings.ts";
import {DefaultObject, ItemPreset} from "./Utility/ItemPreset.ts";
import {Crafter} from "./TemplateBoard/Crafter.ts";

export const useTemplateCrafterStore = defineStore('gabbarowski-template-crafter-store', {
    state: () => ({
        styleSetting: new StyleSettings(),
        presets: [] as ItemPreset[],
        crafterModals: [] as Crafter[]
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
        },
        init() {
          this.crafterModals = [] as Crafter[]
        },
        addCrafterModal(crafter: Crafter) {
            this.crafterModals.push(crafter)
        },
        removeCrafterModal(crafter: Crafter) {
            const index = this.crafterModals.findIndex(obj => obj.uuid === crafter.uuid)
            if(index < 0) {
                console.warn("No crafter has been found")
                return
            }
            this.crafterModals.splice(index,1)
        }
    }

})