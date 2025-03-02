// Routes
// Ambil semua catatan
app.get('/api/notes', (req, res) => {
  db.query('SELECT * FROM notes', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Ambil catatan berdasarkan ID
app.get('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM notes WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(results[0]);
  });
});

// Tambah catatan baru
app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  db.query(
    'INSERT INTO notes (title, content) VALUES (?, ?)',
    [title, content],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: results.insertId, title, content });
    }
  );
});

// Perbarui catatan
app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: 'Title and content are required' });
  }
  db.query(
    'UPDATE notes SET title = ?, content = ? WHERE id = ?',
    [title, content, id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json({ id, title, content });
    }
  );
});

// Hapus catatan
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM notes WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted' });
  });
});