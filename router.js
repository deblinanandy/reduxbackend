const express = require('express');
const registerController = require('./registrationcontroller');
const Login = require('./Login');
const auth = require("./verifyToken");
const show = require('./showall');
const router = express.Router();
router.get('/', (req, res) => {
    res.send('Welcome');
})
router.post('/register', registerController.register);
router.post('/login', Login.login);
router.get('/show', auth.verifyToken, show.showUsers);

module.exports = router;
