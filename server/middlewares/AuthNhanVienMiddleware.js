const { verify } = require("jsonwebtoken");

const validateTokenNV = (req, res, next) => {
    const NhanVienToken = req.header("accessToken");

    if (!NhanVienToken) return res.json({err: "Không phải nhân viên"});

    try {
        const validToken = verify(NhanVienToken, "NhanVien");

        if (validToken){
            return next();
        }
    } catch(err){
        return res.json({error : err})
    }
}

module.exports = {validateTokenNV};