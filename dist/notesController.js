"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteByIdHanlder = exports.editNoteByIdHandler = exports.getOneNoteHandler = exports.getAllNotesHandler = exports.addNoteHandler = void 0;
const nanoid_1 = require("nanoid");
const notes_1 = require("./notes");
const addNoteHandler = (req, res) => {
    const { title, tags, body } = req.body;
    const id = (0, nanoid_1.nanoid)(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;
    const newNote = {
        title, tags, body, id, createdAt, updatedAt
    };
    notes_1.notes.push(newNote);
    const isSuccess = notes_1.notes.filter((note) => note.id === id).length > 0;
    if (isSuccess) {
        return res.status(201).json({ "message": "Catatan berhasil ditambah", "data": { "noteId": id } });
    }
    return res.status(500).json({ "message": "catatan gagal ditambah" });
};
exports.addNoteHandler = addNoteHandler;
const getAllNotesHandler = (req, res) => {
    return res.status(200).json(notes_1.notes);
};
exports.getAllNotesHandler = getAllNotesHandler;
const getOneNoteHandler = (req, res) => {
    const { id } = req.params;
    const note = notes_1.notes.filter((n) => n.id === id)[0];
    if (!note) {
        return res.sendStatus(404).end();
    }
    return res.status(200).json(note);
};
exports.getOneNoteHandler = getOneNoteHandler;
const editNoteByIdHandler = (req, res) => {
    const { id } = req.params;
    const { title, tags, body } = req.body;
    const updatedAt = new Date().toISOString();
    const index = notes_1.notes.findIndex((note) => note.id === id);
    try {
        notes_1.notes[index] = {
            title: title,
            tags: tags,
            body: body,
            id: notes_1.notes[index].id,
            createdAt: notes_1.notes[index].createdAt,
            updatedAt: updatedAt
        };
        return res.status(200).json({ "message": "Catatan berhasil diperbarui" });
    }
    catch (error) {
        console.log(notes_1.notes[index]);
        return res.status(404).json({ "message": "Gagal memperbarui catatan" });
    }
};
exports.editNoteByIdHandler = editNoteByIdHandler;
const deleteNoteByIdHanlder = (req, res) => {
    const { id } = req.params;
    const index = notes_1.notes.findIndex((note) => note.id === id);
    try {
        notes_1.notes.splice(index, 1);
        return res.status(200).json({ "message": "Catatan berhasil dihapus" });
    }
    catch (error) {
        return res.status(404).json({ "message": "Catatan gagal dihapus" });
    }
};
exports.deleteNoteByIdHanlder = deleteNoteByIdHanlder;
