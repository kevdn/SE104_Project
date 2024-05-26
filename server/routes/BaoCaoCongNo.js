const express = require("express")
const router = express.Router();
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')
const db = require('../middlewares/db');
router.get('/BaoCaoCongNo', validateTokenTP, (req, res) => {
    return res.json("Valid");
})

const takeData = async (month, year) => {
    const sql = "SELECT NHACUNGCAP.TenNhaCungCap, SUM(NHACUNGCAP.ConNo) AS ConNo FROM NHACUNGCAP, PHIEUNHAPHANG WHERE (MONTH(PHIEUNHAPHANG.NgayNhap) = ? AND YEAR(PHIEUNHAPHANG.NgayNhap) = ?) AND NHACUNGCAP.MaNhaCungCap = PHIEUNHAPHANG.MaNhaCungCap GRoup by NHACUNGCAP.TenNhaCungCap"
    const [result] = await db.promise().query(sql, [month, year]);
    return result;
}

router.get('/BaoCaoCongNoThang', async (req, res) => {
    const { month, year } = req.query;
    try {
        const data = await takeData(month, year);
        res.json(data);
    } catch (error) {
        console.error("Failed to fetch report data:", error);
        res.json({err: "Lỗi khi lấy dữ liệu báo cáo công nợ"})
    }
})

module.exports = router;    
