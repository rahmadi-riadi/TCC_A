// routes/noteRoutes.js
const express = require("express");
const noteController = require("../controllers/noteController");

const router = express.Router();

router.get("/notes", noteController.getAllNotes);
router.get("/notes/:id", noteController.getNoteById);
router.post("/notes", noteController.createNote);
router.put("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
