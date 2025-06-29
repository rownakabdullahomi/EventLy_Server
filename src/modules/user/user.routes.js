import { Router } from "express";
import { userController } from "./user.controller.js";

const userRoutes = Router();

userRoutes.post("/", userController.createUser);
userRoutes.post("/login", userController.loginUser);

export default userRoutes;