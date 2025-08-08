import express, { Application, Request, Response } from "express";
import mongoose, { Schema } from "mongoose";

const app: Application = express();

app.use(express.json())

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
  }
});

const Note = mongoose.model("Note", noteSchema);

// ================note create===============
app.post("/note/creaate-note", async (req: Request, res: Response) => {

    //approach 01 to data inchart mongodb
//   const myNote = new Note({
//     title: "Learing Mongooses now",
//     author: "Arafat",
//     body: "Learing Mongooses in Programming hero",
//     comments: [
//       {
//         body: "Good, Onk vlo",
//         date: new Date(),
//       },
//     ],
//     hidden: true,
//     meta: {
//       votes: 20,
//     },
//   });
//   await myNote.save();


//approach 02 to data inchart mongodb
const body = req.body;
const note = await Note.create(body)

  res.status(201).json({
    success: true,
    message: "Note create successfully",
    note
  });
});

//==================gate all note=============
app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
  console.log(notes);
  res.status(200).json({
    success: true,
    notes,
  });
  return notes;
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Our Server");
});

export default app;
