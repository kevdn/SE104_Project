const express = require("express")
const router = express.Router();
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')
const db = require('../middlewares/db');
router.get('/BaoCaoCongNo', validateTokenTP, (req, res) => {
    return res.json("Valid");
})

router.get('/BaoCaoCongNoThang', (req, res) => {
    const { month, year } = req.query;
    const sql = "SELECT NHACUNGCAP.TenNhaCungCap, SUM(NHACUNGCAP.ConNo) FROM NHACUNGCAP, PHIEUNHAPHANG WHERE (MONTH(PHIEUNHAPHANG.NgayNhap) = ? AND YEAR(PHIEUNHAPHANG.NgayNhap) = ?) AND NHACUNGCAP.MaNhaCungCap = PHIEUNHAPHANG.MaNhaCungCap GRoup by NHACUNGCAP.TenNhaCungCap"
    db.query(sql, [month, year], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result)
            res.json(result);
        }
    })
})

module.exports = router;
