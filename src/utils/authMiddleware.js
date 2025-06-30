import jwt from "jsonwebtoken"
import { secretKey } from "../config/jwt.config.js";

export const verifyToken = (req, res, next) => {
    // const authHeader = req.headers.authorization;;
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        return res.status(401).json({
            success: false, message: "Unauthorized: Missing token!"
        });
    }
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
        return res.status(401).json({
            success: false, message: "Unauthorized: Invalid token format!"
        });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // attach user data to request
        next();
    } catch (error) {
        return res.status(403).json({
            success: false, message: "Forbidden: Invalid token!"
        });
    }
} 