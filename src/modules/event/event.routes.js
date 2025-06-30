import { Router } from "express";
import { verifyToken } from "../../utils/authMiddleware.js";
import { eventController } from "./event.controller.js";

const eventRoutes = Router();

eventRoutes.post("/", eventController.createEvent);
eventRoutes.post("/:id", verifyToken, eventController.joinEvent);
eventRoutes.get("/", eventController.allEvents);
eventRoutes.get("/:id", eventController.getEventsByUserId);
eventRoutes.get("/single/:id", eventController.getEventById);
eventRoutes.patch("/:id", eventController.updateEventById);
eventRoutes.delete("/:id", eventController.deleteEvent);


export default eventRoutes;