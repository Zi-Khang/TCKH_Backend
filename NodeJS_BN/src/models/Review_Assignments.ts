import { configSchema } from '../configs/modules';
import { EAssigment } from '../types';
import mongoose, { Schema, model } from "mongoose";

const reviewAssignmentSchema = new Schema({
    reviewerID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    articleID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        require: true,
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
