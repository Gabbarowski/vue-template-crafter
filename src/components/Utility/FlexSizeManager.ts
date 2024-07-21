import {v4} from "uuid";
import {ref} from "vue";

export class FlexSizeManager {
    uuid = v4()
    desktopWidth = "33%"
    tabletWidth = "50%"
    mobileWidth = "100%"
    currentSize = ref("100%")

    constructor() {
        this.calculateFlexSize()
    }

    calculateFlexSize() {
        const size = window.innerWidth
        if(!this.currentSize) return
        this.currentSize.value = this.mobileWidth
        if (size > 576) {
            this.currentSize.value = this.tabletWidth
        }
        if (size > 992) {
            this.currentSize.value = this.desktopWidth
        }
    }
}