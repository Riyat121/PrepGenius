import jwt from "jsonwebtoken";
import tokenBlacklistModel from "../models/blacklist.model.js";

const authUser = async (req, res, next) => {

    // ✅ Cookies aur Authorization header dono support karta hai
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            message: "Token not provided."
        });
    }

    const isTokenBlacklisted = await tokenBlacklistModel.findOne({ token });

    if (isTokenBlacklisted) {
        return res.status(401).json({
            message: "Token is invalid"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid token."
        });
    }
};

export default authUser;