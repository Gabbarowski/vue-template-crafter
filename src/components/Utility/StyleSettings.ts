import {CssDefaultStyle} from "../Interfaces";
import {useTemplateCrafterStore} from "../templateCrafterStore";

export class StyleSettings {
    cssDefaultClass = {} as CssDefaultStyle
    itemDefaultWidth = {
        input: {
            mobileWidth: "100%",
            tabletWidth: "50%",
            desktopWidth: "33.33%"
        },
        button: {
            mobileWidth: null,
            tabletWidth: null,
            desktopWidth: null
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
        this.cssDefaultClass.inputFloatingWrapper = "c-input-floating-wrapper"
        this.cssDefaultClass.label = "c-label"
        this.cssDefaultClass.header = "c-label"
        this.cssDefaultClass.button = "c-button"
        this.cssDefaultClass.buttonStylePrefix = "c-button-"
        this.cssDefaultClass.buttonDefaultStyle = "primary"
        this.cssDefaultClass.alertBorder = "c-alert-border"
        this.cssDefaultClass.alertMessage = "c-alert-message"
        this.cssDefaultClass.crafterWrapper = "c-crafter-wrapper"
    }

    private updateStore() {
        const crafterStore = useTemplateCrafterStore()
        crafterStore.defaultSetting(this)
    }

    loadBootstrapStyle() {
        //
    }

    loadBEGStyle() {
        this.cssDefaultClass.button = "button"
        this.cssDefaultClass.buttonStylePrefix = "button-"
        this.cssDefaultClass.buttonDefaultStyle = "primary"
        this.cssDefaultClass.input = "form-control"
        this.cssDefaultClass.inputWrapper = "form-group"
        this.cssDefaultClass.inputFloatingWrapper = ""

        this.updateStore()
    }
}

