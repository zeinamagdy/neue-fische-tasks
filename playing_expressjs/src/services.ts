import { Bookmark, bookmarks } from "./data/data.t";

// create here the fumnction that used for api bookmarks
export function getAllBookmarks(): Bookmark[]{
    return bookmarks
}

export function getBoomarkByid (id: number):Bookmark| null {
    return  bookmarks.find(book => book.id == id)?? null
}