const express = require("express")
const router = express.Router();
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')
const db = require('../middlewares/db');
router.get('/Devices', (validateTokenNV || validateTokenTP), (req, res) => {
    return res.json("Valid");
})

router.get('/getDevices', (req, res) =>{
    try{
        const sql = "SELECT SANPHAM.TenSanPham, SANPHAM.MaLoaiSanPham, SANPHAM.GiaSanPham, NHACUNGCAP.TenNhaCungCap, SANPHAM.SoLuongTon, SANPHAM.SoLuongBan FROM SANPHAM, NHACUNGCAP, CT_PNH, PHIEUNHAPHANG WHERE SANPHAM.MaSanPham = CT_PNH.MaSanPham AND CT_PNH.MaPhieuNhap = PHIEUNHAPHANG.MaPhieuNhap AND PHIEUNHAPHANG.MaNhaCungCap = NHACUNGCAP.MaNhaCungCap";
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.json(result);
            }
        })
    } catch(err){
        console.log(err);
        res.json({err: "Lỗi khi lấy dữ liệu thiết bị"})
    }
})

const getDevices = async (productType) => {
    const sql = `SELECT SANPHAM.TenSanPham, SANPHAM.MaLoaiSanPham, SANPHAM.GiaSanPham, NHACUNGCAP.TenNhaCungCap, SANPHAM.SoLuongTon, SANPHAM.SoLuongBan FROM SANPHAM, NHACUNGCAP, CT_PNH, PHIEUNHAPHANG WHERE SANPHAM.MaSanPham = CT_PNH.MaSanPham AND CT_PNH.MaPhieuNhap = PHIEUNHAPHANG.MaPhieuNhap AND PHIEUNHAPHANG.MaNhaCungCap = NHACUNGCAP.MaNhaCungCap AND SANPHAM.MaLoaiSanPham = '${productType}'`;
    const [result] = await db.promise().query(sql);
    return result;
}

router.get("/findDevices", async (req, res) => {
    const productType = req.query.productType
    db.connect();
    const data = await getDevices(productType);
    res.json(data);
})

module.exports = router;
