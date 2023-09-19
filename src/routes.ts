import express from "express"
import { addNoteHandler, deleteNoteByIdHanlder, editNoteByIdHandler, getAllNotesHandler, getOneNoteHandler } from "./notesController"

const router = express.Router()

router.post("/notes", addNoteHandler)
router.get('/notes', getAllNotesHandler)
router.get('/notes/:id', getOneNoteHandler)
router.put('/notes/:id', editNoteByIdHandler)
router.delete('/notes/:id', deleteNoteByIdHanlder)

export default router