import jwt from "jsonwebtoken"
import { secretKey } from "../config/jwt.config.js"

function generateToken(user) {
    const payload = {
        id: user._id,
        email: user.email
    }
    return jwt.sign(payload, secretKey, { expiresIn: "1h" })
}

export default generateToken;