// app.js
const express = require('express');
const registerRoutes = require('./router');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const port = 9000;

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use('/api', registerRoutes);
app.use(cookieParser());
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
