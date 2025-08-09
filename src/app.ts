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
  },
},{
  versionKey: false,
  timestamps: true
});

const Note = mongoose.model("Note", noteSchema);

// ================note create===============
app.post("/note/creaate-note", async (req: Request, res: Response) => {

    //approach 01 to data inchart mongodb//
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
});
//==================gate single note=============
app.get("/notes/:noteId", async (req: Request, res: Response) => {
        const noteId = req.params.noteId;
        const notes = await Note.findById(noteId)
  console.log(notes);
  res.status(200).json({
    success: true,
    notes,
  });
});
//==================Update========================
app.patch("/notes/:noteId", async (req: Request, res: Response) => {
    const updatedBody = req.body;
    const noteId = req.params.noteId;
    console.log(noteId);
    
    console.log("updatebody",updatedBody);
    const notes = await Note.findByIdAndUpdate(noteId, updatedBody,{new: true})
       // const note = await Note.findOneAndUpdate({ _id: noteId }, updatedBody, { new: true, })
       // const note = await Note.updateOne({ _id: noteId }, updatedBody, { new: true, })
  console.log(notes);
  res.status(200).json({
    success: true,
    notes,
  });
});
//==================Delete========================
app.delete("/notes/:noteId", async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const notes = await Note.findByIdAndDelete(noteId)
    // const note1 = await Note.findOneAndDelete({ _id: noteId })
    // const note2 = await Note.deleteOne({ _id: noteId })
  res.status(200).json({
    success: true,
    notes,
  });
});


app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Our Server");
});

export default app;
