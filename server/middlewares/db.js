const mysql = require('mysql2');
const config = require('../config/config.json');


const db = mysql.createConnection({
    host: config.development.host, 
    user: config.development.username,
    password: config.development.password,   
    database: config.development.database
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the database.');
    }
});

module.exports = db;
