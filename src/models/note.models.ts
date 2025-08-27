import mongoose, { Schema } from "mongoose";
import { INote } from "../interfaces/note.interfaces.";

//==================schema========================
const noteSchema = new Schema<INote>({
  title: { type: String, require: true, trim: true }, 
  author: { type: String, default: "" },
  category: {
    type: String,
    enum: ["Parsonal", "Working", "Study", "Others"],
    default: "Parsonal",
  },
  pinned: {
    type: Boolean,
    default: false
  },
  tags:{
    label:{type: String, require: true},
    color:{ type: String, default: "Red"}
  },
  user:{
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
},{
  versionKey: false,
  timestamps: true
});

//==================model========================
export const Note = mongoose.model<INote>("Note", noteSchema);