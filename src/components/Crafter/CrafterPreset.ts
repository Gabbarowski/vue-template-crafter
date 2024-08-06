import {Crafter} from "./Crafter";

/**
 * This Class will manage many useful presets for faster development with crafter template method
 */
export class CrafterPreset {
    crafter = {} as Crafter

    constructor(crafter: Crafter) {
        this.crafter = crafter
    }
}