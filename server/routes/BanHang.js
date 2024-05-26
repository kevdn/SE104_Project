const express = require('express');
const router = express.Router();
const db = require('../middlewares/db');
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')

router.get('/BanHang', (validateTokenNV || validateTokenTP), async (req, res) => {
    return res.json("Valid");
})

module.exports = router;
