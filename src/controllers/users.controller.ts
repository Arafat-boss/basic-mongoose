import express, { Request, Response } from "express";
import { User } from "../models/user.models";
import z from "zod";

export const userRoutes = express.Router();

const CreateUserZodSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
  password: z.string(),
  age: z.number(),
  role: z.string().optional(),
});

// ================note create===============
userRoutes.post("/create-user", async (req: Request, res: Response) => {
  //approach 02 to data inchart mongodb
  try {
    // const Zodbody = await CreateUserZodSchema.parseAsync(req.body)
    // console.log(Zozbody);
    const body = req.body;
    const user = await User.create(body);

    res.status(201).json({
      success: true,
      message: "User create successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
      error
    })
  }
});
//==================gate all note=============
userRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await User.find();
  console.log(notes);
  res.status(200).json({
    success: true,
    notes,
  });
});
//==================gate single note=============
userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const users = await User.findById(userId);
  console.log(users);
  res.status(200).json({
    success: true,
    users,
  });
});
//==================Update========================
userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const updatedBody = req.body;
  const userId = req.params.userId;
  console.log(userId);

  console.log("updatebody", updatedBody);
  const users = await User.findByIdAndUpdate(userId, updatedBody, {
    new: true,
  });
  // const note = await Note.findOneAndUpdate({ _id: noteId }, updatedBody, { new: true, })
  // const note = await Note.updateOne({ _id: noteId }, updatedBody, { new: true, })
  console.log(users);
  res.status(200).json({
    success: true,
    users,
  });
});
//==================Delete========================
userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.noteId;
  const users = await User.findByIdAndDelete(userId);
  // const note1 = await Note.findOneAndDelete({ _id: noteId })
  // const note2 = await Note.deleteOne({ _id: noteId })
  res.status(200).json({
    success: true,
    users,
  });
});
