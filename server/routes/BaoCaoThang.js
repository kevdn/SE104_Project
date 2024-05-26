const express = require("express")
const router = express.Router();
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')
const db = require('../middlewares/db');
router.get('/BaoCaoThang', validateTokenTP, (req, res) => {
    return res.json("Valid");
})

const takeData = async (month, year) => {
    const sql = `SELECT LOAISANPHAM.TenLoaiSanPham, Sum(CT_PBH.SoLuong) AS SoLuotMua FROM PHIEUBANHANG, SANPHAM, LOAISANPHAM, CT_PBH WHERE (MONTH(PHIEUBANHANG.NgayBan) = '${month}' AND YEAR(PHIEUBANHANG.NgayBan) = '${year}') AND PHIEUBANHANG.MaPhieuBan = CT_PBH.MaPhieuBan AND SANPHAM.MaSanPham = CT_PBH.MaSanPham AND SANPHAM.MaLoaiSanPham = LOAISANPHAM.MaLoaiSanPham GROUP BY LOAISANPHAM.TenLoaiSanPham ORDER BY SoLuotMua DESC`
    const [result] = await db.promise().query(sql);
    return result;
}
router.get('/BaoCaoXuHuongThang', async (req, res) => {
    const { month, year } = req.query;
    const data = await takeData(month, year);
    console.log(data)
    if (data.length === 0) {
        return res.json({err: "Không có dữ liệu báo cáo xu hướng tháng này"})
    }
    else {
        return res.json(data);
    }
})

module.exports = router;
