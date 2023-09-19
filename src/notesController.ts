import { Request, Response } from "express"
import { nanoid } from "nanoid"
import { notes } from "./notes"

export const addNoteHandler = (req: Request, res: Response) => {
    const { title, tags, body } = req.body

    const id = nanoid(16)
    const createdAt = new Date().toISOString()
    const updatedAt = createdAt

    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    }

    notes.push(newNote)

    const isSuccess = notes.filter((note) => note.id === id).length > 0

    if (isSuccess) {
        return res.status(201).json({ "message": "Catatan berhasil ditambah", "data": { "noteId": id } })
    }

    return res.status(500).json({ "message": "catatan gagal ditambah" })
}

export const getAllNotesHandler = (req: Request, res: Response) => {
    return res.status(200).json(notes)
}

export const getOneNoteHandler = (req: Request, res: Response) => {
    const { id } = req.params

    const note = notes.filter((n) => n.id === id)[0]

    if (!note) {
        return res.sendStatus(404).end()
    }

    return res.status(200).json(note)
}

export const editNoteByIdHandler = (req: Request, res: Response) => {
    const { id } = req.params

    const { title, tags, body } = req.body

    const updatedAt = new Date().toISOString()

    const index = notes.findIndex((note) => note.id === id)

    try {
        notes[index] = {
            title: title,
            tags: tags,
            body: body,
            id: notes[index].id,
            createdAt: notes[index].createdAt,
            updatedAt: updatedAt
        }

        return res.status(200).json({ "message": "Catatan berhasil diperbarui" })
    } catch (error) {
        console.log(notes[index])
        return res.status(404).json({ "message": "Gagal memperbarui catatan" })
    }

}

export const deleteNoteByIdHanlder = (req: Request, res: Response) => {
    const { id } = req.params

    const index = notes.findIndex((note) => note.id === id)

    try {
        notes.splice(index, 1)
        return res.status(200).json({"message": "Catatan berhasil dihapus"})
    } catch (error) {
        return res.status(404).json({"message": "Catatan gagal dihapus"})
    }
}