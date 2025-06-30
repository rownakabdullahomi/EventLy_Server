import { Event } from "./event.model.js";

const createEvent = async (req, res) => {
    try {
        const event = await Event.create(req.body);

        res.status(201).json({
            success: true,
            message: "Event added successfully",
            data: event,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Filed to add event",
            error: {
                name: error.name,
                message: error.message,
                errors: error.errors,
            },
        });
    }
}

export const eventController = {
    createEvent,
   
}