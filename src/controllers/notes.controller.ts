 import express, { Request, Response } from"express"
import { Note } from "../models/note.models";


export const notesRoutes = express.Router()

// ================note create===============
notesRoutes.post("/create-note", async (req: Request, res: Response) => {

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
notesRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find().populate('user')

  console.log(notes);
  res.status(200).json({
    success: true,
    notes,
  });
});

//==================Update========================
notesRoutes.patch("/:noteId", async (req: Request, res: Response) => {
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
notesRoutes.delete("/:noteId", async (req: Request, res: Response) => {
    const noteId = req.params.noteId;
    const notes = await Note.findByIdAndDelete(noteId)
    // const note1 = await Note.findOneAndDelete({ _id: noteId })
    // const note2 = await Note.deleteOne({ _id: noteId })
  res.status(200).json({
    success: true,
    notes,
  });
});
// ========================================================================================
notesRoutes.post("/creaate-note", async (req: Request, res: Response) => {


//approach 02 to data inchart mongodb
const body = req.body;
const note = await Note.create(body)

  res.status(201).json({
    success: true,
    message: "Note create successfully",
    note
  });
});
