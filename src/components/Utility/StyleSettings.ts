/*
 * Copyright (c) 2024. Daniel Grabasch
 * All rights reserved
 * This File is Part of Vue Template Crafter
 */

import {CssDefaultStyle} from "../Interfaces";
import {useTemplateCrafterStore} from "../templateCrafterStore";

export class StyleSettings {
    cssDefaultClass = {} as CssDefaultStyle
    itemDefaultWidth = {
        input: {
            mobileWidth: "100%",
            tabletWidth: "49%",
            desktopWidth: "33%"
        },
        button: {
            mobileWidth: null,
            tabletWidth: null,
            desktopWidth: null
        },
        textbox: {
            mobileWidth: "100%",
            tabletWidth: "100%",
            desktopWidth: "100%"
        }
    }
    breakPoints = {
        mobile: 576,
        tablet: 768,
        desktop: 992
    }

    constructor() {
        this.cssDefaultClass = {} as CssDefaultStyle
        this.cssDefaultClass.input = "c-input"
        this.cssDefaultClass.inputWrapper = "c-input-wrapper"
        this.cssDefaultClass.inputContainer = "c-input-container"
        this.cssDefaultClass.select = "c-select"
        this.cssDefaultClass.selectWrapper = "c-select-wrapper"
        this.cssDefaultClass.selectContainer = "c-select-container"
        this.cssDefaultClass.label = "c-label"
        this.cssDefaultClass.header = "c-header"
        this.cssDefaultClass.button = "c-button"
        this.cssDefaultClass.buttonStylePrefix = "c-button-"
        this.cssDefaultClass.buttonDefaultStyle = "primary"
        this.cssDefaultClass.buttonDeleteStyle = "danger"
        this.cssDefaultClass.buttonConfirmStyle = "primary"
        this.cssDefaultClass.buttonCancelStyle = "secondary"
        this.cssDefaultClass.radioButtonItem = "c-radio"
        this.cssDefaultClass.radioButtonWrapper = "c-radio-wrapper"
        this.cssDefaultClass.alertBorder = "c-alert-border"
        this.cssDefaultClass.alertMessage = "c-alert-message"
        this.cssDefaultClass.crafterWrapper = "c-crafter-wrapper"
        this.cssDefaultClass.textbox = "c-textbox"
        this.cssDefaultClass.textboxWrapper = "c-textbox-wrapper"
        this.cssDefaultClass.modal = "c-modal"
        this.cssDefaultClass.modalBackground = "c-modal-background"
        this.cssDefaultClass.loadingSpinner = "c-loading-spinner"
        this.cssDefaultClass.checkbox = "c-checkbox"
        this.cssDefaultClass.checkboxWrapper = "c-checkbox-wrapper"
    }

    load() {
        const crafterStore = useTemplateCrafterStore()
        crafterStore.defaultSetting(this)
    }

    loadBootstrapStyle() {
        //
    }

    loadBEGStyle() {
        /// Size
        this.itemDefaultWidth.input.desktopWidth = "100%"
        this.itemDefaultWidth.input.tabletWidth = "100%"
        this.itemDefaultWidth.input.mobileWidth = "100%"

        /// Classes
        this.cssDefaultClass.button = "button"
        this.cssDefaultClass.buttonStylePrefix = "button-"
        this.cssDefaultClass.buttonDefaultStyle = "primary"
        this.cssDefaultClass.buttonDeleteStyle = "primary"
        this.cssDefaultClass.buttonConfirmStyle = "primary"
        this.cssDefaultClass.buttonCancelStyle = "ghost-tertiary"
        this.cssDefaultClass.input = "form-control"
        this.cssDefaultClass.inputContainer = "form-group"
        this.cssDefaultClass.inputWrapper = ""
        this.cssDefaultClass.loadingSpinner = "ms-1 loading-spinner"
        this.cssDefaultClass.checkboxWrapper = "form-group d-flex align-items-center checkbox"
        this.cssDefaultClass.select = "form-control"
        this.cssDefaultClass.selectWrapper = "form-group"
        this.cssDefaultClass.radioButtonItem = "radio"
        this.cssDefaultClass.radioButtonWrapper = "radio-group"

        this.load()
    }
}

