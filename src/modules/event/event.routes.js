import { Router } from "express";
import { verifyToken } from "../../utils/authMiddleware.js";
import { eventController } from "./event.controller.js";

const eventRoutes = Router();

eventRoutes.post("/", verifyToken, eventController.createEvent);
eventRoutes.post("/:id", verifyToken, eventController.joinEvent);
eventRoutes.get("/", verifyToken, eventController.allEvents);
eventRoutes.get("/:id", verifyToken, eventController.getEventsByUserId);
eventRoutes.get("/single/:id", verifyToken, eventController.getEventById);
eventRoutes.patch("/:id", verifyToken, eventController.updateEventById);
eventRoutes.delete("/:id", verifyToken, eventController.deleteEvent);


export default eventRoutes;