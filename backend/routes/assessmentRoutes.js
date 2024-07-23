const express = require('express');
const db = require('../config/db');
const router = express.Router();

router.post('/', (req, res) => {
  const { title, description, dueDate } = req.body;

  if (!title || !description || !dueDate) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.run(`INSERT INTO assessments (title, description, dueDate) VALUES (?, ?, ?)`,
    [title, description, dueDate], function (err) {
      if (err) return res.status(500).json({ message: 'Failed to create assessment' });
      res.status(201).json({ id: this.lastID, title, description, dueDate });
    });
});

router.get('/', (req, res) => {
  db.all(`SELECT * FROM assessments`, [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Failed to retrieve assessments' });
    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get(`SELECT * FROM assessments WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ message: 'Failed to retrieve assessment' });
    if (!row) return res.status(404).json({ message: 'Assessment not found' });
    res.json(row);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;

  db.run(`UPDATE assessments SET title = ?, description = ?, dueDate = ? WHERE id = ?`,
    [title, description, dueDate, id], function (err) {
      if (err) return res.status(500).json({ message: 'Failed to update assessment' });
      if (this.changes === 0) return res.status(404).json({ message: 'Assessment not found' });
      res.json({ message: 'Assessment updated successfully' });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM assessments WHERE id = ?`, [id], function (err) {
    if (err) return res.status(500).json({ message: 'Failed to delete assessment' });
    if (this.changes === 0) return res.status(404).json({ message: 'Assessment not found' });
    res.json({ message: 'Assessment deleted successfully' });
  });
});

module.exports = router;
