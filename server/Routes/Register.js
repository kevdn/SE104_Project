const express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt")

const mysql = require('mysql2');

const db = require('../middlewares/db');

router.post("/register", (req, res) => {
    const {idNumber, username, password, name, role} = req.body;
    const sqlAddEmployee = "INSERT INTO NHANVIEN VALUES (?, ?, ?)"
    bcrypt.hash(password, 10)
    .then((hash) => {
        const sqlAddAccount = "INSERT INTO TAIKHOAN VALUES (?, ?, ?)"
        db.query(sqlAddAccount, [username, hash, role], (err, data) => {
            if (err){
                console.log("Lỗi thêm tài khoản");
                res.json("Failed");
            }
            else{
                console.log("Thêm tài khoản thành công");
            }
        })
    })
    .then(() => {
        db.query(sqlAddEmployee, [idNumber, username, name], (err, data) => {
            if (err){
                console.log("Lỗi thêm tài khoản vào nhân viên", err)
                res.json("Failed")
            }
            else {
                console.log("Thêm thông tin nhân viên thành công");
                res.json("Register success");
            }
        })
    })


})

router.get("/register", (req, res) => {
    const sql = "SELECT * FROM CHUCVU";
    db.query(sql, (err, data) => {
        if (err){
            console.error("Lỗi truy vấn:", err);
            return res.json("Failed");       
        }
        return res.json(data);
    })
})

module.exports = router;