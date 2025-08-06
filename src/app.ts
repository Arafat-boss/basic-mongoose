import express, { Application, Request, Response } from 'express';
import mongoose, { Schema } from 'mongoose';

const app: Application = express()

const noteSchema = new Schema({
    title: String,
    containt: String,

})

const Note = mongoose.model('Note', noteSchema)

app.post('/creaate-note',(req: Request, res: Response )=>{
    const myNote = new Note({
        title: "Learing Mongooses",
        containt: "Learing Mongooses in Programming hero"
    })
    res.status(201).json({
        success: true,
        message: "Note create successfully",
        note: myNote
    })
})

app.get('/' ,(req: Request, res: Response )=>{
    res.send('Welcome To Our Server')
})

export default app;