const express = require("express");
const router = express.Router();
const {validateTokenTP} = require("../middlewares/AuthTruongPhongMiddleware")
const {validateTokenNV} = require("../middlewares/AuthNhanVienMiddleware")

router.get("/SuaChua", (validateTokenNV || validateTokenTP), (req, res) => {
    return res.json("Valid")
})

module.exports = router;