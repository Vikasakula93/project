const db = require('../config/db');

const createUser = (username, email, password, callback) => {
    db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [username, email, password], function (err) {
        callback(err, this.lastID);
    });
};

const getUserByEmail = (email, callback) => {
    db.get("SELECT * FROM users WHERE email = ?", [email], callback);
};

module.exports = { createUser, getUserByEmail };
