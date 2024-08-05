import {v4} from "uuid";

export class DataTransfer {
    uuid = v4()
    data: any

    setData(data: any) {
        this.data = data;
        return this
    }

    getData() {
        return this.data
    }

}