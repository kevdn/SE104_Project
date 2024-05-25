const express = require('express');
const router = express.Router()
const bcrypt = require("bcrypt")
const mysql = require('mysql2');
const {sign} = require('jsonwebtoken')
const db = require('../middlewares/db');

router.post("/login", (req, res) => {
    const {username, password} = req.body;
    const sql = "SELECT * FROM TAIKHOAN WHERE MaTK = ?";
    db.query(sql,[username, password], (err, data) => {
        if (err){
            console.log(err);
            return res.status(500).json("Database error")
        }
        else {
            if (data.length === 0){
                return res.json({error: "Not found"})
            }
            else {
                bcrypt.compare(password, data[0].MatKhau).then((match) => {
                    if (!match){
                        res.json({error: "Not found"})
                    }
                    else {
                        if (data[0].MaChucVu === "1"){
                            const TruongPhongToken = sign({username : data[0].MaTK}, "NhanVien")
                            res.json({token: TruongPhongToken, role: "1"})
                        }
                        else if (data[0].MaChucVu === "2"){
                            const NhanVienToken = sign({username: data[0].MaTK}, "TruongPhong")
                            res.json({token: NhanVienToken, role: "2"})
                        }
                    }
                })
            }
        }
    })
})
module.exports = router;
