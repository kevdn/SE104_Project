const express = require("express")
const router = express.Router();
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware');
const db = require("../middlewares/db");

router.get('/ChangingRules', validateTokenTP, (req, res) => {
    return res.json("Valid");
})

const upDateWayToPay = async (wayToPay) => {
    const query = `INSERT INTO HINHTHUCTHANHTOAN (TenHTTT) VALUES ('${wayToPay}')`;
    const [result] = await db.promise().query(query);
    return result;
}

router.post('/ChangingWayToPay', async (req, res) => {
    const wayToPay = req.body.wayToPay;
    const selectedOption = req.body.selectedOption;
    db.connect();
    if (wayToPay === ""){
        return res.json({err: "Vui lòng điền đầy đủ thông tin"});
    }
    
    const result = await upDateWayToPay(wayToPay);
    if (result.affectedRows > 0){
        return res.json({success: true});
    }
    else {
        return res.json({err: "Có lỗi xảy ra"});
    }
    db.close();
})


router.post('/ChangingProductType', async (req, res) => {
    const productType = req.body.productType;
    db.connect();
    if (productType === ""){
        return res.json({err: "Vui lòng điền đầy đủ thông tin"});
    }
    const query = `INSERT INTO LOAISANPHAM (TenLoaiSanPham, LoiNhuan) VALUES ('${productType}', 30)`;
    const [result] = await db.promise().query(query);
    if (result.affectedRows > 0){
        return res.json({success: true});
    }
    else {
        return res.json({err: "Có lỗi xảy ra"});
    }
    db.close();
})

module.exports = router;
