import mongoose, { Schema, model } from "mongoose";
import { configSchema } from "../configs/modules";
import { EDecision, EStatusArticle, EStatusReview } from "../types";

const articleReviewSchema = new Schema({
    round: {
        type: Number,
        required: true,
        default: 1,
    },
    reviewerID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contentReview: {
        type: String,
        require: true,
    },
    status: {
        type: Number,
        enum: Object.values(EStatusReview).filter(
            (value) => typeof value === "number"
        ),
    },
    decision: {
        type: Number,
        enum: Object.values(EDecision).filter(
            (value) => typeof value === "number"
        ),
        require: true,
    },
    comments: {
        type: String
    }
}, { _id: false }); // Don't create a new _id for the subdocument

const articleSchema = new Schema(
    {
        title: {
            type: String, 
            required: true
        },
        abstract: {
            type: String
        },
        content: {
            type: String,
            required: true
        },
        keywords: {
            type: [String], // Changed to string array to better represent keywords
        },
        status: {
            type: Number,
            enum: Object.values(EStatusArticle).filter(
                (value) => typeof value === "number"
            ),
        },
        authorID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        publisherID: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User'
        },
        reviews: [articleReviewSchema] // Here we embed the reviews directly into the article
    },
    configSchema
);

export default model('Article', articleSchema);
