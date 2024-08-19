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
     * @param nameOfEntry Which entry would you delete. Is for a user-friendly double check
     * @param label Set the caption for both delete buttons.
     * @param message Define a special Message or warning. %nameOfEntry% will replace with nameOfEntry attribute
     * @param topic Define a special Topic / Header of confirm modal. %nameOfEntry% will replace with nameOfEntry attribute
     * @return {deleteButton, confirmButton, closeButton, confirmModal} You get all buttons and the modal.
     */
    addDeleteButton(
        nameOfEntry: string,
        label: string = "Delete",
        message: string = "Are you sure you want to delete the '%nameOfEntry%' entry",
        topic: string = "Delete '%nameOfEntry%'"
    ) {
        const confirmModal = new FactoryCrafter().getReactive()
        const topicString = topic.replace("%nameOfEntry%", nameOfEntry)
        const messageString = message.replace("%nameOfEntry%", nameOfEntry)
        confirmModal.addHeader(topicString)
        confirmModal.addTextbox(messageString)
        const closeButton = confirmModal.addCloseButton()
        const confirmButton= confirmModal.addButton(label)
            .move("footerRight")
            .setStyle(this.styleSetting.cssDefaultClass.buttonDeleteStyle) as Button

        const deleteButton = this.addButton(label).onClick(() => {
            confirmModal.openInModal()
        })
            deleteButton.move("footerLeft")
            .setStyle(this.styleSetting.cssDefaultClass.buttonDeleteStyle)
        return {deleteButton , confirmButton, closeButton, confirmModal}
    }
}