import { Router } from "express";
import { userController } from "./user.controller.js";
import { verifyToken } from "../../utils/authMiddleware.js";

const userRoutes = Router();

userRoutes.post("/", userController.createUser);
userRoutes.post("/login", userController.loginUser);
userRoutes.get("/jwt", verifyToken, userController.getLoggedUser);

export default userRoutes;