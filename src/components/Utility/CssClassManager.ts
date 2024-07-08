


/**
 * Copyright (c) 2024 Daniel Grabasch
 * All rights reserved
 * This File is Part of Vue Template Crafter
 * Managed the possible CSS ClassList of all Template Crafter Item
 */
export class CssClassManager {
    classList = [] as string[]

    /**
     * Add one or more Css Classes to the component
     * @param cssClass
     */
    addClass(cssClass: string|string[]) {
        if(Array.isArray(cssClass)) {
            for(const newCssClass of cssClass) {
                this.addClassItem(newCssClass)
            }
        } else {
            this.addClassItem(cssClass)
        }
        return this
    }

    /**
     * Remove one or more Css Classes from component
     * @param cssClass
     */
    removeClass(cssClass: string|string[]) {
        if(Array.isArray(cssClass)) {
            for(const removeCssClassItem of cssClass) {
                this.removeClassItem(removeCssClassItem)
            }
        } else {
            this.removeClassItem(cssClass)
        }
        return this
    }

    /**
     * Add the single string/item to the ClassList
     * @param cssClass
     */
    private addClassItem(cssClass: string) {
        for(const splitNewCssClass of cssClass.split(" ")) {
            if(!this.classList.find(obj => obj == splitNewCssClass)) {
                this.classList.push(splitNewCssClass);
            }
        }
    }

    /**
     * Remove the single string/item from ClassList
     * @param cssClass
     */
    private removeClassItem(cssClass: string) {
        for(const splitNewCssClass of cssClass.split(" ")) {
            const index = this.classList.findIndex(obj => obj == splitNewCssClass)
            if(index >= 0) {
                this.classList.splice(index, 1);
            }

        }
    }

    toString() {
        return this.classList.join(" ")
    }

}