import {Crafter} from "./Crafter"
import type {ObjectHandleType} from "../Interfaces";
import {Button} from "../Button/Button";

export class FactoryCrafter <T extends object = ObjectHandleType> extends Crafter <T> {

    /**
     * Create a close button to the "footerRight" Position
     */
    addSaveButton(label: string = "Save"): Button {
        return this.addButton(label)
            .move("footerRight").onValidClick((button) => {
                button.setIsLoading()
            })
            .setInputKeyEnterExecution()
            .setIcon("fa-light fa-floppy-disk me-1")
            .setStyle(this.styleSetting.cssDefaultClass.buttonConfirmStyle)
    }

    /**
     * Create a save button to the "footerRight" Position
     */
    addCloseButton(label: string = "Close"): Button {
        return this.addButton(label)
            .move("footerRight")
            .onClick((button) => {
                if(button.crafter) button.crafter.close()
            }).setStyle(this.styleSetting.cssDefaultClass.buttonCancelStyle)
    }

    /**
     * Create a save and Close button to the "footerRight" Position
     */
    addSaveAndCloseButton() {
        const closeButton = this.addCloseButton()
        const saveButton = this.addSaveButton()
        return {saveButton, closeButton}
    }

    /**
     * Create an interactive confirmation Modal.
     *
     * Returned three Buttons and the confirmation Modal.
     * confirmButton => is the Button on confirmation Modal which could confirm your action.
     * formButton => This button will render in your exists crafter. A click on it will open the confirmation Modal
     * cancelButton => This button is inside your confirmation Modal. It will cancel the process and close confirmation Modal
     * confirmCrafter => The crafter of new confirmation modal
     *
     *
     * @param nameOfEntry Which entry would you delete. Is for a user-friendly double check
     * @param label Set the caption for both confirm buttons (formButton & confirmButton).
     * @param message Define a special Message or warning. %nameOfEntry% will replace with nameOfEntry attribute
     * @param topic Define a special Topic / Header of confirm modal. %nameOfEntry% will replace with nameOfEntry attribute
     * @param cancelButtonLabel "Define the text of cancel button
     * @return {confirmButton, formButton, closeButton, confirmCrafter}
     */
    addConfirmButton(
        nameOfEntry: string,
        label: string = "Delete",
        message: string = "Are you sure you want to delete the '%nameOfEntry%' entry",
        topic: string = "Delete '%nameOfEntry%'",
        cancelButtonLabel = "Cancel"
    ) {
        const confirmCrafter = new FactoryCrafter().getReactive()
        const topicString = topic.replace("%nameOfEntry%", nameOfEntry)
        const messageString = message.replace("%nameOfEntry%", nameOfEntry)
        confirmCrafter.addHeader(topicString)
        confirmCrafter.addTextbox(messageString)
        const cancelButton = confirmCrafter.addCloseButton()
        cancelButton.label = cancelButtonLabel
        const formButton= confirmCrafter.addButton(label)
            .move("footerRight")
            .setStyle(this.styleSetting.cssDefaultClass.buttonDeleteStyle) as Button

        const confirmButton = this.addButton(label).onClick(() => {
            confirmCrafter.openInModal()
        })
        confirmButton.move("footerLeft")
            .setStyle(this.styleSetting.cssDefaultClass.buttonDeleteStyle)
        return { confirmButton , formButton, cancelButton, confirmCrafter}
    }
}