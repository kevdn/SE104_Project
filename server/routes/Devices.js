const express = require("express")
const router = express.Router();
const {validateTokenNV} = require('../middlewares/AuthNhanVienMiddleware')
const {validateTokenTP} = require('../middlewares/AuthTruongPhongMiddleware')
const db = require('../middlewares/db')

router.get('/Devices', (validateTokenNV || validateTokenTP), (req, res) => {
    return res.json("Valid");
})

router.get('/Devices/typesOfDevices', (validateTokenNV || validateTokenTP), async (req, res) => {
    //use sql query to get data from database
    const query = "SELECT * FROM LOAISANPHAM";
    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({err: err});
        }
        return res.json(result);
    });
})

module.exports = router;
