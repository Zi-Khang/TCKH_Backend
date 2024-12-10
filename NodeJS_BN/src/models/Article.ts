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
}, { _id: false });

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
            type: [String],
        },
        image: {
            type: String,
        },
        contentPublic: {
            type: String,
        },
        journalIssue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'JournalIssues'
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
        reviews: [articleReviewSchema]
    },
    configSchema
);

export default model('Article', articleSchema);
