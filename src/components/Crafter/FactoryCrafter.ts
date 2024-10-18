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
     * @param nameOfEntry Which entry would you delete. Is for a user-friendly double check
     * @param label Set the caption for both confirm buttons (formButton & confirmButton).
     * @param message Define a special Message or warning. %nameOfEntry% will replace with nameOfEntry attribute
     * @param topic Define a special Topic / Header of confirm modal. %nameOfEntry% will replace with nameOfEntry attribute
     * @param cancelButtonLabel "Define the text of cancel button
     * @return {ConfirmButtonResult}
     */
    addConfirmButton(
        nameOfEntry: string,
        label: string = "Delete",
        message: string = "Are you sure you want to delete the '%nameOfEntry%' entry",
        topic: string = "Delete '%nameOfEntry%'",
        cancelButtonLabel = "Cancel"
    ): ConfirmButtonResult {
        const confirmCrafter = new FactoryCrafter().getReactive() as FactoryCrafter
        const topicString = topic.replace("%nameOfEntry%", nameOfEntry)
        const messageString = message.replace("%nameOfEntry%", nameOfEntry)
        confirmCrafter.addHeader(topicString)
        confirmCrafter.addTextbox(messageString)
        const cancelButton = confirmCrafter.addCloseButton()
        cancelButton.label = cancelButtonLabel
        const confirmButton= confirmCrafter.addButton(label)
            .move("footerRight")
            .setStyle(this.styleSetting.cssDefaultClass.buttonDeleteStyle) as Button

        const formButton = this.addButton(label).onClick(() => {
            confirmCrafter.openInModal()
        })
        formButton.move("footerLeft")
            .setStyle(this.styleSetting.cssDefaultClass.buttonDeleteStyle)
        return { confirmButton , formButton, cancelButton, confirmCrafter}
    }
}

/**
 * All necessary items to make more customizations. Very import is the confirmButton

 * @property {Button} formButton - This button will render in your exists crafter. A click on it will open the confirmation Modal
 * @property {Button} cancelButton - This button is inside your confirmation Modal. It will cancel the process and close confirmation Modal
 * @property {FactoryCrafter} confirmCrafter - The crafter of new confirmation modal
 */
export interface ConfirmButtonResult {
    /**
     * The Button on the confirmation Modal which could confirm your action.
     * This is the most important property for customizations.
     */
    confirmButton: Button,
    /**
     * This button will render in your existing crafter.
     * A click on it will open the confirmation Modal.
     */
    formButton: Button,
    /**
     * This button is inside your confirmation Modal.
     * It will cancel the process and close the confirmation Modal.
     */
    cancelButton: Button,
    /**
     * The crafter of the new confirmation modal.
     * Use this to make further customizations to the modal itself.
     */
    confirmCrafter: FactoryCrafter
}