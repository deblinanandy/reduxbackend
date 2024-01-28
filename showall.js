// showUsersController.js
const db = require('./db');

const showUsers = (req, res) => {
    const getAllUsersQuery = 'SELECT id, username, email FROM u';

    db.query(getAllUsersQuery, (error, results) => {
        if (error) {
            console.error('Error fetching users: ' + error.stack);
            return res.status(500).json({ message: 'Error fetching users.' });
        }

        res.status(200).json({ users: results });
    });
};

module.exports = {
    showUsers
}

