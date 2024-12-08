import { configSchema } from '../configs/modules';
import mongoose, { Schema, model } from "mongoose";

const processSchema = new mongoose.Schema({
    articleID: 
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    authorID: 
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    reviewerID: 
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    publicerID: 
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    editorID: 
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    time: 
    { 
        type: Date 
    },
    note:
    { 
        type: String, 
        maxLength: 50 
    }
},
    configSchema
);

export default model('Process', processSchema);
