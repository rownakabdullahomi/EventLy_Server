import { User } from "../modules/user/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateJwtToken.js";

export const getToken = async (email, password) => {
    try {
        const existingUser = await User.findOne({email});
        if(!existingUser){
            throw new Error("User not found");
        }
        const isPasswordValid = bcrypt.compare(password, existingUser.password)
        if(!isPasswordValid){
            throw new Error("Incorrect Password");
        }
        const token = generateToken(existingUser);
        return token;
    } catch (error) {
        throw new Error("Invalid credentials")
    }
}

