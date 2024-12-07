import { configSchema } from '../configs/modules';
import { EAssigment } from '../types';
import mongoose, { Schema, model } from "mongoose";

const reviewAssignmentSchema = new Schema({
    reviewerID:
    {
        type: Number, ref: 'User', required: true
    },
    articleID:
    {
        type: Number, ref: 'Article', required: true
    },
    editorID:
    {
        type: Number, ref: 'User'
    },
    status:
    {
        type: Number,
        enum: Object.values(EAssigment).filter(
            (value) => typeof value === "number"
        ),
    }
},
    configSchema
);

export default model('ReviewAssignment', reviewAssignmentSchema);
