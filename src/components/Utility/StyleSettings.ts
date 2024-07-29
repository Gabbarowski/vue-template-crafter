import {CssDefaultStyle} from "./Interfaces.ts";

export class StyleSettings {
    cssDefaultClass = {} as CssDefaultStyle
    itemDefaultWidth = {
        input: {
            mobileWidth: "100%",
            tabletWidth: "50%",
            desktopWidth: "33.33%"
        },
        button: {
            mobileWidth: "8rem",
            tabletWidth: "8rem",
            desktopWidth: "8rem"
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
        this.cssDefaultClass.label = "c-label"
        this.cssDefaultClass.header = "c-label"
        this.cssDefaultClass.button = "c-button"
        this.cssDefaultClass.alertBorder = "c-alert-border"
        this.cssDefaultClass.alertMessage = "c-alert-message"
        this.cssDefaultClass.crafterWrapper = "c-container-default"
    }
}

