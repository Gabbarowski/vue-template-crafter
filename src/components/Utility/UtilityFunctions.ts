export class UtilityFunctions {
    static deepEqual(obj1: any, obj2: any) {
        if (obj1 === obj2) return true;
        if (typeof obj1 !== 'object' || obj1 === null ||
            typeof obj2 !== 'object' || obj2 === null) return false;

        let keys1 = Object.keys(obj1), keys2 = Object.keys(obj2);

        if (keys1.length !== keys2.length) return false;

        for (let key of keys1) {
            if (!keys2.includes(key) || !this.deepEqual(obj1[key], obj2[key])) return false;
        }

        return true;
    }
}