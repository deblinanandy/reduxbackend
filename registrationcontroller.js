// registerController.js
const db = require('./db');
const bcrypt = require('bcryptjs');

const validateEmail = (email) => {
    return email && typeof email === 'string' && email.includes('@') && email.includes('.');
};
const register = async (req, res) => {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
        return res.status(400).json({ message: 'Please provide username, email, and password.' });
    }

    if (!validateEmail(email)) {
        return res.status(400).json({ message: 'Invalid email address.' });
    }

    console.log('email');
    db.query('SELECT email FROM u WHERE email=?', [email], async (error, results) => {
        if (error) {
            throw error;
        }

        if (results.length > 0) {
            return res.status(400).json({ message: 'Email is already registered.' });
        }

        // Continue with user registration
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const insertUserQuery = 'INSERT INTO u (username, email, password) VALUES (?, ?, ?)';

        db.query(insertUserQuery, [username, email, hashedPassword], (err, result) => {
            if (err) {
                console.error('Error registering user: ' + err.stack);
                return res.status(500).json({ message: 'Error registering user.' });
            }

            console.log('User registered with ID: ' + result.insertId);
            res.status(200).json({ message: 'User registered successfully.' });
        });
    });
};

module.exports = {
    register,
};