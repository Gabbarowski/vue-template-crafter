import {BoardItem} from "./BoardItem.ts";

export class Row {
    boardItems = [] as BoardItem[]

    addBoardItem(boardItem: BoardItem) {
        this.boardItems.push(boardItem)
    }
}