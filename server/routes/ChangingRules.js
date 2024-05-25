const express = require("express")
const router = express.Router();
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')

router.get('/ChangingRules', validateTokenTP, (req, res) => {
    return res.json("Valid");
})

module.exports = router;