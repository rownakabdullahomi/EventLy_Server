import { model, Schema } from 'mongoose';

const eventSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
        },
        postedBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: [true, "User ID who posted is Required"],
        },
        dateTime: {
            type: Date,
            required: [true, 'Date is required'],
            validate: {
                validator: function (value) {
                    return value >= new Date();
                },
                message: 'Event date must be in the present or future',
            },
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
        },
        attendeeCount: {
            type: Number,
            default: 0,
            min: [0, 'Minimum value is 0'],
        },
        joinedUsers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const Event = model('Event', eventSchema);

