const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file

const checkAuth = {

    verifyToken: (req, res, next) => {
        try {
            const token = req.headers.authorization; 
            console.log('headers', req.headers);
            if (!token) {
                return res.status(403).json({ status: false, message: "A token is required for authentication" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
            return next();
        } catch (error) {
            return res.status(500).json({ status: false, message: "Token Invalid" });
        }
    }
}

module.exports = checkAuth;