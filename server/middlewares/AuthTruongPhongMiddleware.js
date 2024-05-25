const { verify } = require("jsonwebtoken");

const validateTokenTP = (req, res, next) => {
    const TruongPhongToken = req.header("accessToken");

    if (!TruongPhongToken) return res.json({err: "Không phải trưởng phòng"});

    try {
        const validToken = verify(TruongPhongToken, "TruongPhong");

        if (validToken){
            return next();
        }
    } catch(err){
        return res.json({error : err})
    }
}

module.exports = {validateTokenTP};