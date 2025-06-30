import { Router } from "express";

import { verifyToken } from "../../utils/authMiddleware.js";
import { eventController } from "./event.controller.js";

const eventRoutes = Router();

eventRoutes.post("/", verifyToken, eventController.createEvent);


export default eventRoutes;