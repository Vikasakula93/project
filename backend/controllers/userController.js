const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { createUser, getUserByEmail } = require('../models/userModel');
const log = require('simple-node-logger').createSimpleLogger('project.log');

const registerUser = (req, res) => {
    const { username, email, password } = req.body;
    log.info(`Register attempt: ${email}`);

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    getUserByEmail(email, (err, user) => {
        if (err) return res.status(500).json({ message: 'Error fetching user by email' });
        if (user) return res.status(400).json({ message: 'Email already registered' });

        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return res.status(500).json({ message: 'Error hashing password' });

            createUser(username, email, hashedPassword, (err, userId) => {
                if (err) return res.status(500).json({ message: 'Error creating user' });
                res.status(201).json({ userId });
            });
        });
    });
};

const loginUser = (req, res) => {
    const { email, password } = req.body;
    log.info(`Login attempt: ${email}`);

    getUserByEmail(email, (err, user) => {
        if (err || !user) return res.status(401).json({ message: 'Invalid email or password' });

        bcrypt.compare(password, user.password, (err, result) => {
            if (err || !result) return res.status(401).json({ message: 'Invalid email or password' });

            const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
            res.json({ token });
        });
    });
};

module.exports = { registerUser, loginUser };
