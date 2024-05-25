const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const mysql = require('mysql2/promise'); // Use the promise-compatible version
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'QLCHTBDT'
});

router.post("/register", async (req, res) => {
    const { idNumber, username, password, name, role } = req.body;
    try {
        const hash = await bcrypt.hash(password, 10);
        const sqlAddAccount = "INSERT INTO TAIKHOAN VALUES (?, ?, ?)";
        await db.query(sqlAddAccount, [username, hash, role]);
        const sqlAddEmployee = "INSERT INTO NHANVIEN VALUES (?, ?, ?)";
        await db.query(sqlAddEmployee, [idNumber, username, name]);
        console.log("Thêm thông tin nhân viên thành công");
        res.json("Register success");
    } catch (error) {
        console.error("Error:", error);
        res.json("Failed");
    }
});

router.get("/register", async (req, res) => {
    try {
        const sql = "SELECT TenChucVu FROM CHUCVU";
        const [data] = await db.query(sql);
        res.json(data);
    } catch (error) {
        console.error("Lỗi truy vấn:", error);
        res.json("Failed");
    }
});

module.exports = router;