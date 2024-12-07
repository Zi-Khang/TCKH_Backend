import { configSchema } from '../configs/modules';
import mongoose, { Schema, model } from "mongoose";

const processSchema = new mongoose.Schema({
    articleID: 
    { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
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
