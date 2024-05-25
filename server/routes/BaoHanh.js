const express = require("express")
const router = express.Router();
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')

router.get('/BaoHanh', (validateTokenNV || validateTokenTP), (req, res) => {
    return res.json("Valid");
})

module.exports = router;