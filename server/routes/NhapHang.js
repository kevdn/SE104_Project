const express = require('express');
const router = express.Router();
const db = require('../middlewares/db');
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')

router.get('/NhapHang', (validateTokenNV || validateTokenTP), async (req, res) => {
    return res.json("Valid");
})


const checkProvider = async (provider) => {
  const query = `SELECT * FROM NHACUNGCAP WHERE TenNhaCungCap = '${provider}'`;
  const [rows] = await db.promise().query(query);
  return rows.length > 0;
};
const insertProvider = async (provider, diaChi, SoDienThoai, No) => {
  const query = `INSERT INTO NHACUNGCAP (TenNhaCungCap, DiaChi, SoDienThoai, ConNo) VALUES ('${provider}', '${diaChi}', '${SoDienThoai}', ${No})`;
  await db.promise().query(query);
};

router.post('/NhapHang', async (req, res) => {    
    const data = req.body;

    // Connect to the database.
    await db.connect();

    // Check if the provider (data.MaNhaCungCap) exists in the database.
    //sql 
    const providerExists = await checkProvider(data.TenNhaCungCap);
    let productIds = [];
    let productTypeIds = [];


    // If the provider does not exist, insert the new provider into the database.
    if (!providerExists) {
        await insertProvider(data.TenNhaCungCap, data.DiaChi, data.SoDienThoai, data.No);
    }

    else {
        // Update the provider's debt and cost if the provider already exists.
        //sql
        const query = `UPDATE NHACUNGCAP SET ConNo = ConNo + ${data.No} WHERE TenNhaCungCap = '${data.TenNhaCungCap}'`;  
        await db.promise().query(query);
    }
    const [[provider]] = await db.promise().query(`SELECT MaNhaCungCap FROM NHACUNGCAP WHERE TenNhaCungCap = '${data.TenNhaCungCap}'`);
    const providerId = provider.MaNhaCungCap;

    //add each product to the database
    //sql
    //check if product exists
    //if not, insert new product
    //if exists, update product
    for (let i = 0; i < data.products.length; i++) {
        const product = data.products[i];
        const query = `SELECT * FROM SANPHAM WHERE TenSanPham = '${product.TenSanPham}'`;
        const [rows] = await db.promise().query(query);
        const [[productType]] = await db.promise().query(`SELECT MaLoaiSanPham FROM LOAISANPHAM WHERE TenLoaiSanPham = '${product.LoaiSanPham}'`);
        const productTypeId = productType.MaLoaiSanPham;
        if (rows.length === 0) {
            // Insert a new product into the database.
            //sql
            const query = `INSERT INTO SANPHAM (TenSanPham, MaLoaiSanPham, GiaSanPham, NgaySanXuat, ThoiGianBaoHanh, SoLuongTon, SoLuongBan) 
            VALUES ('${product.TenSanPham}', '${productTypeId}', ${product.DonGia}, '${product.NgaySanXuat}', ${product.ThoiGianBaoHanh}, ${product.SoLuong}, 0)`;                    
            await db.promise().query(query);
        } else {
            // Update the existing product in the database.
            //sql
            const query = `UPDATE SANPHAM SET SoLuongTon = SoLuongTon + ${product.SoLuong} WHERE MaSanPham = '${rows[0].MaSanPham}'`;
            await db.promise().query(query);
        }
        const [[productRow]] = await db.promise().query(`SELECT MaSanPham FROM SANPHAM WHERE TenSanPham = '${product.TenSanPham}'`);
        productIds.push(productRow.MaSanPham);
    }

    //insert into PHIEUNHAPHANG
    //sql
    const query = `INSERT INTO PHIEUNHAPHANG (MaNhaCungCap, NgayNhap, TraTruoc, TongTien)
            VALUES (${providerId}, '${data.NgayNhap}', ${data.TraTruoc}, ${data.TongTien})`;

    await db.promise().query(query);
    const [rows] = await db.promise().query(`SELECT LAST_INSERT_ID() AS id`);
    const phieuNhapHangId = rows[0].id;

    //insert into CT_PNH
    //sql

    for (let i = 0; i < data.products.length; i++) {
      const product = data.products[i];
      const [[productType]] = await db.promise().query(`SELECT MaLoaiSanPham FROM LOAISANPHAM WHERE TenLoaiSanPham = '${product.LoaiSanPham}'`);
      const productTypeId = productType.MaLoaiSanPham;
      const productId = productIds[i]; // Access the product ID directly by index
      const query = `INSERT INTO CT_PNH (MaPhieuNhap, MaSanPham, SoLuong, DonGia, ThanhTien)
          VALUES (${phieuNhapHangId}, ${productId}, ${product.SoLuong}, ${product.DonGia}, ${product.ThanhTien})`;
      await db.promise().query(query);
    }

    // Save other data to the database
    // This will depend on your specific database and business logic
    // For example, you might need to insert a new PHIEUNHAPHANG and CT_PNH
    

    // Close the database connection.
    //await db.close();

    // Return a success message to the user.
    res.send('Success');
});

module.exports = router;
