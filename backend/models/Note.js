// models/Note.js
const db = require("../config/db");

const Note = {
  getAll: (callback) => {
    db.query("SELECT * FROM notes", callback);
  },
  getById: (id, callback) => {
    db.query("SELECT * FROM notes WHERE id = ?", [id], callback);
  },
  create: (title, content, callback) => {
    db.query(
      "INSERT INTO notes (title, content) VALUES (?, ?)",
      [title, content],
      callback
    );
  },
  update: (id, title, content, callback) => {
    db.query(
      "UPDATE notes SET title = ?, content = ? WHERE id = ?",
      [title, content, id],
      callback
    );
  },
  delete: (id, callback) => {
    db.query("DELETE FROM notes WHERE id = ?", [id], callback);
  },
};

module.exports = Note;
