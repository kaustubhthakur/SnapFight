const User = require('../models/User')
require('dotenv').config();
const jwt = require('jsonwebtoken')
const protectRoute = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token)
        return res.status(401).json({
            success: false,
            message: "Unauthorised user!",
        });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorised user!",
        });
    }
};
module.exports = protectRoute