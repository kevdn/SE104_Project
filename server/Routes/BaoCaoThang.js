const express = require("express");
const router = express.Router();
const {validateTokenTP} = require("../middlewares/AuthTruongPhongMiddleware")

router.get("/BaoCaoThang", validateTokenTP, (req, res) => {
    return res.json("Valid")
})

module.exports = router;