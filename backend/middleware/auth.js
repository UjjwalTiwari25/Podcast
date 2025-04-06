const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authMiddleware = async (req, res, next) => {
    const token = req.cookies.prodcastToken;

    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ error: "Unauthorized" });
            }
            req.user = user;
            next();
        } 
         
    } catch (error) {
        console.error("Error authenticating user:", error.message);
        return res.status(401).json({ error: "Unauthorized" });
        
    }

};
module.exports = authMiddleware;