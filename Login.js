const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser'); // Add cookie-parser middleware
require('dotenv').config();

const login = async (req, res) => {
    try {
        const { password, email } = req.body;

        if (!password || !email) {
            return res.status(400).json({ message: 'Please provide email and password.' });
        } else {
            db.query('SELECT * FROM u WHERE email=?', [email], async (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ status: 'error', error: 'Internal Server Error' });
                }

                console.log('User from the database:', result[0]);

                if (!result[0] || !(await bcrypt.compare(password, result[0].password))) {
                    console.log('Invalid email or password');
                    return res.status(401).json({
                        status: 'error',
                        error: 'Invalid email or password',
                    });
                } else {
                    const user = {
                        id: result[0].id, // Include the user ID
                        email: result[0].email,
                    };

                    console.log('User to be signed in:', user);

                    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

                    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // Max age in milliseconds (1 hour)

                    console.log('Login successful. Token:', token);

                    res.status(200).json({
                        status: 'success',
                        message: 'Login successful',
                        token: token,
                        user: {
                            id: user.id,
                            email: user.email,
                        },
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', error: 'Internal Server Error' });
    }
};

module.exports = {
    login,
};
