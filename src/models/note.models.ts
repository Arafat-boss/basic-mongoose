import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema({
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
},{
  versionKey: false,
  timestamps: true
});

export const Note = mongoose.model("Note", noteSchema);