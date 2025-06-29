import { Router } from "express";
import userRoutes from "../modules/user/user.routes.js";

const routes = Router();

routes.use("/user", userRoutes);

export default routes;