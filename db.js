const sql = require('mysql');
const dotenv = require("dotenv").config();


const db = sql.createConnection({
   host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});
db.connect(function(err) {
  if (err) {
    console.error('Error connecting to database:', err);
    throw err;
  }
  console.log("Connected!");
});
module.exports = db;




