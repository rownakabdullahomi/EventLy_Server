import { getToken } from "../../services/getJwtToken.js";
import { User } from "./user.model.js";

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Filed to create user",
            error: {
                name: error.name,
                message: error.message,
                errors: error.errors,
            },
        });
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const token = await getToken(email, password);
        // console.log(token);
        res.status(201).json({
            success: true,
            message: "Token get successfully",
            data: token,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Filed to login user",
            error: {
                name: error.name,
                message: error.message,
                errors: error.errors,
            },
        });
    }
}



export const userController = {
    createUser,
    loginUser
}