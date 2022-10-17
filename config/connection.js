const mysql = require('mysql2');
const util = require("util"); 
require('dotenv').config();

// create connection to the database (db)
const db = mysql.createConnection(
    {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME
    },
    console.log(`Connected to database`)
);

db.connect(err => {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
});

db.query = util.promisify(db.query); 

module.exports = db;