const express = require('express');
const router = express.Router();
const db = require('../middlewares/db');
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')

router.get('/BanHang', (validateTokenNV || validateTokenTP), async (req, res) => {
    return res.json("Valid");
})

const checkCustomer = async (customer) => {
    const query = `SELECT * FROM KHACHHANG WHERE TenKhachHang = '${customer}'`;
    const [rows] = await db.promise().query(query);
    return rows.length > 0;
}

const checkCustomerType = async (customerType) => {
    const query = `SELECT MaLoaiKhachHang FROM LOAIKHACHHANG WHERE TenLoaiKhachHang = '${customerType}'`;
    const [type] = await db.promise().query(query);
    return type[0].MaLoaiKhachHang;
}

const insertCustomer = async (customer, customerTypeId, phone) => {
    const query = `INSERT INTO KHACHHANG (TenKhachHang, MaLoaiKhachHang, SDT) VALUES ('${customer}', ${customerTypeId}, '${phone}')`;
    await db.promise().query(query);
}

router.post('/BanHang', async (req, res) => {
    const data = req.body;

    // Connect to the database.
    await db.connect();

    // Check if the customers (data.TenKhachHang) exists in the database.
    //sql
    
        const customerExists = await checkCustomer(data.TenKhachHang);
        const customerTypeId = await checkCustomerType(data.LoaiKhachHang);
        
        // If the customer does not exist, insert the new customer into the database.
        if (!customerExists) {
            await insertCustomer(data.TenKhachHang, customerTypeId, data.SoDienThoai);
        }
        
    //update information of each product, reduce quantity of product in database, increase total number of product sold
    //sql
    for (let i = 0; i < data.products.length; i++) {
        const product = data.products[i];
        //update information of product
        const query = `UPDATE SANPHAM SET SoLuongTon = SoLuongTon - ${product.SoLuong}, SoLuongBan = SoLuongBan + ${product.SoLuong} WHERE TenSanPham = '${product.TenSanPham}'`;
        await db.promise().query(query);
    }

    //create PhieuBanHang
    //sql
    let [customersID] = await db.promise().query(`SELECT MaKhachHang FROM KHACHHANG WHERE TenKhachHang = '${data.TenKhachHang}'`);
    custtomerID = customersID[0].MaKhachHang;
    
    const query = `INSERT INTO PHIEUBANHANG (MaKhachHang, NhanVienBanHang, NgayBan, MaHTTT, ChietKhau, TongGiaTriHD) 
            VALUES (${custtomerID}, ${data.NhanVienTiepNhan}, '${data.NgayBan}', ${data.HinhThucThanhToan}, ${data.ChietKhau}, ${data.TongTien})`;
    await db.promise().query(query);

    //create CT_PBH
    const [rows] = await db.promise().query(`SELECT LAST_INSERT_ID() AS id`);
    const PBH_ID = rows[0].id;
    //sql
    for (let i = 0; i < data.products.length; i++) {
        const product = data.products[i];
        const [[productID]] = await db.promise().query(`SELECT MaSanPham FROM SANPHAM WHERE TenSanPham = '${product.TenSanPham}'`);
        const query = `INSERT INTO CT_PBH (MaSanPham, MaPhieuBan, SoLuong, DonGia, ThanhTien) 
            VALUES (${productID.MaSanPham}, ${PBH_ID}, ${product.SoLuong}, ${product.DonGia}, ${product.ThanhTien})`;
        await db.promise().query(query);
    }

    return res.json("Success");

})


module.exports = router;
