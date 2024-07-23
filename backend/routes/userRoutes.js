const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const log = require('simple-node-logger').createSimpleLogger('project.log'); 
const db = require('../config/db'); 
const { JWT_SECRET } = require('../config/config'); 




router.post('/register', (req, res) => {
  const { username, email, password } = req.body;
  log.info(`Register attempt: ${email}`);

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      log.error('Database error during registration:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (row) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
      if (err) {
        log.error('Failed to register user:', err);
        return res.status(500).json({ message: 'Failed to register user' });
      }
      res.status(201).json({ id: this.lastID, username, email });
    });
  });
});


router.post('/login', (req, res) => {
  const { email, password } = req.body;
  log.info(`Login attempt: ${email}`);

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      log.error('Database error during login:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    if (!row || !bcrypt.compareSync(password, row.password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: row.id, username: row.username }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});






module.exports = router;
