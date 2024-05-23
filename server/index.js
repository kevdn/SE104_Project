const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

//connect to mysql database
const mysql = require('mysql');
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password',
    database: 'crud_database'
});



app.listen(3001, () => {
    console.log('Server is running on port 3001');
});