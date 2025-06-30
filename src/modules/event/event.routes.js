import { Router } from "express";
import { verifyToken } from "../../utils/authMiddleware.js";
import { eventController } from "./event.controller.js";

const eventRoutes = Router();

eventRoutes.post("/", verifyToken, eventController.createEvent);
eventRoutes.post("/:id", verifyToken, eventController.joinEvent);
eventRoutes.get("/", verifyToken, eventController.allEvents);
eventRoutes.get("/:id", eventController.getEventsByUserId);


export default eventRoutes;