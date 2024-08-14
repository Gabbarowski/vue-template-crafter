import {Crafter} from "./Crafter"
import {ObjectHandleType} from "./../Interfaces";
import {Button} from "../Button/Button.ts";

export class FactoryCrafter <T extends object = ObjectHandleType> extends Crafter <T> {

    /**
     * Create a close button to the "footerRight" Position
     */
    addSaveButton(label: string = "Save"): Button {
        return this.addButton(label)
            .move("footerRight").onValidClick((button) => {
                button.setIsLoading()
            })
            .setIcon("fa-light fa-floppy-disk me-1")
            .setStyle("primary")
    }

    /**
     * Create a save button to the "footerRight" Position
     */
    addCloseButton(label: string = "Close"): Button {
        return this.addButton(label)
            .move("footerRight")
            .onClick((button) => {
                if(button.crafter) button.crafter.close()
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