import { Router } from "express";
import userRoutes from "../modules/user/user.routes.js";
import eventRoutes from "../modules/event/event.routes.js";

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/event", eventRoutes);

export default routes;