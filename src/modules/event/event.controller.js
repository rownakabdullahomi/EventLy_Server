import { Event } from "./event.model.js";
import { ObjectId } from "mongodb";

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
const allEvents = async (req, res) => {
    try {
        const eventData = await Event.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "postedBy", // field in Event model
                    foreignField: "_id", // field in User model
                    as: "postedByDetails",
                },
            },
            {
                $unwind: "$postedByDetails", // to convert array to object
            },
            {
                $project: {
                    title: 1,
                    dateTime: 1,
                    location: 1,
                    description: 1,
                    attendeeCount: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    postedBy: {
                        _id: "$postedByDetails._id",
                        name: "$postedByDetails.name",
                        email: "postedByDetails.email"
                    },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            data: eventData,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Failed to get events",
            error: {
                name: error.name,
                message: error.message,
                errors: error.errors,
            },
        });
    }
};

const joinEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const { userId } = req.body;
        console.log(userId);
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                success: false,
                message: "Event not found"
            });
        }

        if (event.joinedUsers.includes(userId)) {
            return res.status(400).json({
                success: false,
                message: "You already joined this event"
            });
        }

        event.attendeeCount += 1;
        event.joinedUsers.push(userId);
        await event.save();

        res.status(200).json({ success: true, message: "Joined event successfully", data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to join event", error });
    }
};

const getEventsByUserId = async (req, res) => {
    try {
        const userId = req.params.id;
        const query = { postedBy: new ObjectId(userId) }
        const events = await Event.find(query);

        if (!events || events.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No events found for this user.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Event retrieved successfully by id",
            data: events,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Event can not be retrieved",
            error: {
                name: error.name,
                errors: error.errors,
            },
        });
    }
};

const updateEventById = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const event = await Event.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully by id",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Event update failed",
      error: {
        name: error.name,
        message: error.message,
        errors: error.errors,
      },
    });
  }
};

const deleteEvent = async(req, res) => {
    try {
    const id = req.params.id;
    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully by id",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Event can not be deleted",
      error: {
        name: error.name,
        errors: error.errors,
      },
    });
  }
}



export const eventController = {
    createEvent,
    allEvents,
    joinEvent,
    getEventsByUserId,
    updateEventById,
    deleteEvent


}