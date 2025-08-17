import { Types } from "mongoose";

export interface INote {
    title: string,
    author: string,
    category: string,
    pinned: boolean,
    tags:{labrl:string, color: string},
    userID: Types.ObjectId,
}