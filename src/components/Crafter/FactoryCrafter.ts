import {Crafter} from "./Crafter"
import {ObjectHandleType} from "./../Interfaces";
import {Button} from "../Button/Button.ts";

export class FactoryCrafter <T extends object = ObjectHandleType> extends Crafter <T> {

    /**
     * Create a close button to the "footerRight" Position
     */
    addSaveButton(label: string = "Save"): Button {
        const btn = this.addButton(label)
            .move("footerRight").onValidClick(() => {
                btn.setIsLoading()
            })
            .setIcon("fa-light fa-floppy-disk me-1")
            .setStyle("primary")
        return btn
    }

    /**
     * Create a save button to the "footerRight" Position
     */
    addCloseButton(label: string = "Close"): Button {
        return this.addButton(label)
            .move("footerRight")
            .onClick(() => {
                this.close()
            }).setStyle("ghost-tertiary")
    }

    /**
     * Create a save and Close button to the "footerRight" Position
     */
    addSaveAndCloseButton() {
        const closeButton = this.addCloseButton()
        const saveButton = this.addSaveButton()
        return {saveButton, closeButton}
    }
}