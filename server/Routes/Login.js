const express = require('express');
const router = express.Router()

const mysql = require('mysql2');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "123456",
    database: "QLCHTBDT"
});   

router.get("/", (req, res) => {
    const sql = "SELECT * FROM TAIKHOAN"

    db.query(sql, (err, data) => {
        res.json(data)
    })

})

router.post("/Login", (req, res) => {
    const {username, password} = req.body;

    const sql = "SELECT * FROM TAIKHOAN WHERE TenTK = ? AND MatKhau = ?";
    db.query(sql,[username, password], (err, data) => {
        if (err){
            console.log(err);
            return res.status(500).json("Database error")
        }
        if (data.length > 0){
            return res.json("Success")
        }
        else {
            return res.json("Failed")
        }
    })
})

module.exports = router;