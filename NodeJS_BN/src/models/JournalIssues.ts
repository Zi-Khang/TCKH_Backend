import mongoose, { Schema, model } from "mongoose";
import { configSchema } from "../configs/modules";
import { EStatusArticle } from "../types";

const JournalIssue = new Schema({
    volumeID: 
    { 
        type: Schema.Types.ObjectId,
        ref: 'Volume' 
    },
    issueNumber: 
    { 
        type: Number, 
        required: true 
    },
    issueTitle:
    {
        type: String,
    },
    managerID: 
    { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
},
    configSchema
);

export default model('JournalIssue', JournalIssue);
