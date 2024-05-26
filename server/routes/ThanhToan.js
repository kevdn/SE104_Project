const express = require('express');
const router = express.Router();
const db = require('../middlewares/db');
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')

router.get('/ThanhToan', async (req, res) => {
    const sql = "SELECT * FROM `HINHTHUCTHANHTOAN`";
    db.query(sql, (err, result) => {
        if (err) {
            return res.json({err: err});
        } else {
            return res.json(result);
        }
    })

})

module.exports = router;
