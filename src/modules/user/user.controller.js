import { getToken } from "../../services/getJwtToken.js";
import { User } from "./user.model.js";

const createUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.create(req.body);

        const token = await getToken(email, password);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
            token,
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
        const { email, password } = req.body;
        const token = await getToken(email, password);
        const user = await User.findOne({ email }).select("-password");
        // console.log(token);
        res.status(201).json({
            success: true,
            message: "Token get successfully",
            data: user,
            token,
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

const getLoggedUser =  async (req, res) => {
  const userId = req.user.id; // this comes from decoded JWT
  const user = await User.findById(userId).select("-password"); // exclude password
  if (!user) return res.status(404).send("User not found");
  res.json(user);
};



export const userController = {
    createUser,
    loginUser,
    getLoggedUser
}