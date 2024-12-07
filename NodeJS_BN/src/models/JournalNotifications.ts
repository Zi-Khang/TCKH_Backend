import mongoose, { Schema, model } from "mongoose";
import { configSchema } from "../configs/modules";
import { ENoti } from "../types";

const journalNotificationSchema = new mongoose.Schema({
    title:
    {
        type: String
    },
    content:
    {
        type: String
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Number,
        enum: Object.values(ENoti).filter(
            (value) => typeof value === "number"
        ),
    }
},
    configSchema
);

export default model('JournalNotification', journalNotificationSchema);
