"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const notesController_1 = require("./notesController");
const router = express_1.default.Router();
router.post("/notes", notesController_1.addNoteHandler);
router.get('/notes', notesController_1.getAllNotesHandler);
router.get('/notes/:id', notesController_1.getOneNoteHandler);
router.put('/notes/:id', notesController_1.editNoteByIdHandler);
router.delete('/notes/:id', notesController_1.deleteNoteByIdHanlder);
exports.default = router;
