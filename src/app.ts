import express, { Application, Request, Response } from "express";
import mongoose, { Schema } from "mongoose";
import { Note } from "./models/note.models";
import { notesRoutes } from "./controllers/notes.controller";
import { userRoutes } from "./controllers/users.controller";

const app: Application = express();

app.use(express.json())

app.use("/notes", notesRoutes)
app.use("/users", userRoutes)



app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Our Server");
});

export default app;
