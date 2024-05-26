const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const db = require('../middlewares/db');
const checkUsername = async (username) => {
    const sql = `SELECT * FROM TAIKHOAN WHERE MaTK = '${username}'`;
    const [rows] = await db.promise().query(sql);
    return rows.length > 0;
}

const checkIdNumber = async (idNumber) => {
    const sql = `SELECT * FROM NHANVIEN WHERE CCCD = '${idNumber}'`;
    const [rows] = await db.promise().query(sql);
    return rows.length > 0;
}

router.post("/register", async (req, res) => {
    const { idNumber, username, password, name, role } = req.body;
        const hash = await bcrypt.hash(password, 10);
        const userNameExists = await checkUsername(username);
        const idNumberExists = await checkIdNumber(idNumber);
        if (userNameExists || idNumberExists){
            console.log(userNameExists);
            console.log("Username exists");
            res.json("Username exists");
        }
        else {
            const sql = "INSERT INTO TAIKHOAN (MaTK, MatKhau, MaChucVu) VALUES (?, ?, ?)";
            await db.promise().query(sql, [username, hash, role]);
            const sql2 = "INSERT INTO NHANVIEN (CCCD, MaTK, HoTen) VALUES (?, ?, ?)";
            await db.promise().query(sql2, [idNumber, username, name]);
            console.log("Register success");
            res.json("Register success");
        }

});

router.get("/register", async (req, res) => {
        const sql = "SELECT MaChucVu, TenChucVu FROM CHUCVU";
        const [data] = await db.promise().query(sql);
        res.json(data);
});

module.exports = router;
