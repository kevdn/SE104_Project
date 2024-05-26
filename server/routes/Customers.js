const express = require("express")
const router = express.Router();
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')
const db = require('../middlewares/db');
router.get('/Customers', (validateTokenNV || validateTokenTP), (req, res) => {
    return res.json("Valid");
})

router.get('/getCustomers', (req, res) =>{
    try{
        const sql = "SELECT KHACHHANG.MaKhachHang, LOAIKHACHHANG.TenLoaiKhachHang, KHACHHANG.TenKhachHang, KHACHHANG.SDT, COUNT(PHIEUBANHANG.MaPhieuBan) AS SoDonMua FROM KHACHHANG, PHIEUBANHANG, LOAIKHACHHANG WHERE KHACHHANG.MaKhachHang = PHIEUBANHANG.MaKhachHang AND KHACHHANG.MaLoaiKhachHang = LOAIKHACHHANG.MaLoaiKhachHang GROUP BY KHACHHANG.MaKhachHang";
        db.query(sql, (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.json(result);
            }
        })
    } catch(err){
        console.log(err);
        res.json({err: "Lỗi khi lấy dữ liệu khách hàng"})
    }
})

const findCustomers = async (customerPhone) => {
    const sql = `SELECT KHACHHANG.MaKhachHang, LOAIKHACHHANG.TenLoaiKhachHang, KHACHHANG.TenKhachHang, KHACHHANG.SDT, COUNT(PHIEUBANHANG.MaPhieuBan) AS SoDonMua FROM KHACHHANG, PHIEUBANHANG, LOAIKHACHHANG WHERE KHACHHANG.MaKhachHang = PHIEUBANHANG.MaKhachHang AND KHACHHANG.MaLoaiKhachHang = LOAIKHACHHANG.MaLoaiKhachHang AND KHACHHANG.SDT = '${customerPhone}' GROUP BY KHACHHANG.MaKhachHang`;
    const [result] = await db.promise().query(sql);
    return result;
}

router.get('/findCustomers', async (req, res) => {
    const customerPhone = req.query.customerPhone
    db.connect();
    const data = await findCustomers(customerPhone);
    res.json(data);
})

module.exports = router;
