// controllers/noteController.js
const Note = require("../models/Note");

const noteController = {
  getAllNotes: (req, res) => {
    Note.getAll((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },
  getNoteById: (req, res) => {
    const { id } = req.params;
    Note.getById(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.json(results[0]);
    });
  },
  createNote: (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    Note.create(title, content, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: results.insertId, title, content });
    });
  },
  updateNote: (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }
    Note.update(id, title, content, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.json({ id, title, content });
    });
  },
  deleteNote: (req, res) => {
    const { id } = req.params;
    Note.delete(id, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: "Note not found" });
      }
      res.json({ message: "Note deleted" });
    });
  },
};

module.exports = noteController;
