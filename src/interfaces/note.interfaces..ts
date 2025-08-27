import { Types } from "mongoose";

//=================note interface========================
export interface INote {
    title: string,
    author: string,
    category: string,
    pinned: boolean,
    tags:{labrl:string, color: string},
    user: Types.ObjectId,
}