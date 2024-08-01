import {v4} from "uuid";
import {useTemplateCrafterStore} from "../templateCrafterStore.ts";
import {reactive} from "vue";

/**
 * Copyright (c) 2024 Daniel Grabasch
 * All rights reserved
 * This File is Part of Vue Template Crafter
 * Managed the sizes of Flex elements
 * Regarding Breakpoints you can manage in StyleSettings.ts
 */
export class FlexSizeManager {
    uuid = v4()
    desktopWidth = null as null|string
    tabletWidth = null as null|string
    mobileWidth = null as null|string
    desktopMinWidth = null as null|string
    tabletMinWidth = null as null|string
    mobileMinWidth = null as null|string
    desktopMaxWidth = null as null|string
    tabletMaxWidth = null as null|string
    mobileMaxWidth = null as null|string
    inlineStyleCode = reactive({
        value: ""
    })

    constructor() {
        this.inlineStyleCode.value = ""
        this.calculateFlexSize()
    }

    /**
     * Set the width of your component for Mobile, Tablet and Desktop Size.
     * Set to null to ignore default settings or to revoke previously made settings
     * @param mobileWidth
     * @param tabletWidth
     * @param desktopWidth
     */
    setWidth(mobileWidth: string|null, tabletWidth: string|null, desktopWidth: string|null): void {
        this.mobileWidth = mobileWidth
        this.tabletWidth = tabletWidth
        this.desktopWidth = desktopWidth
        this.calculateFlexSize()
    }

    /**
     * Set the min width of your component for Mobile, Tablet and Desktop Size.
     * @param mobileWidth
     * @param tabletWidth
     * @param desktopWidth
     */
    setMinWidth(mobileWidth: string|null, tabletWidth: string|null, desktopWidth: string|null): void {
        this.mobileMinWidth = mobileWidth
        this.tabletMinWidth = tabletWidth
        this.desktopMinWidth = desktopWidth
        this.calculateFlexSize()
    }

    /**
     * Set the min width of your component for Mobile, Tablet and Desktop Size.
     * @param mobileWidth
     * @param tabletWidth
     * @param desktopWidth
     */
    setMaxWidth(mobileWidth: string|null, tabletWidth: string|null, desktopWidth: string|null): void {
        this.mobileMaxWidth = mobileWidth
        this.tabletMaxWidth = tabletWidth
        this.desktopMaxWidth = desktopWidth
        this.calculateFlexSize()
    }

    calculateFlexSize() {
        this.inlineStyleCode.value = ""
        if(this.mobileWidth) this.includeInlineStyleWidth()
        if(this.mobileMinWidth) this.includeInlineStyleMinWidth()
        if(this.mobileMaxWidth) this.includeInlineStyleMaxWidth()
    }

    includeInlineStyleWidth() {
        const size = window.innerWidth
        const breakPoints = useTemplateCrafterStore().styleSetting.breakPoints
        let widthValue = this.mobileWidth
        if (size > breakPoints.mobile) {
            widthValue = this.tabletWidth
        }
        if (size > breakPoints.tablet) {
            widthValue = this.desktopWidth
        }
        this.inlineStyleCode.value += "flex-basis: " + widthValue + ";"
    }

    includeInlineStyleMinWidth() {
        const size = window.innerWidth
        const breakPoints = useTemplateCrafterStore().styleSetting.breakPoints
        let minWidthValue = this.mobileMinWidth
        if (size > breakPoints.mobile) {
            minWidthValue = this.tabletMinWidth
        }
        if (size > breakPoints.tablet) {
            minWidthValue = this.desktopMinWidth
        }
        this.inlineStyleCode.value += "min-width: " + minWidthValue + ";"
    }

    includeInlineStyleMaxWidth() {
        const size = window.innerWidth
        const breakPoints = useTemplateCrafterStore().styleSetting.breakPoints
        let maxWidthValue = this.mobileMaxWidth
        if (size > breakPoints.mobile) {
            maxWidthValue = this.tabletMaxWidth
        }
        if (size > breakPoints.tablet) {
            maxWidthValue = this.desktopMaxWidth
        }
        this.inlineStyleCode.value += "max-width: " + maxWidthValue + ";"
    }
}