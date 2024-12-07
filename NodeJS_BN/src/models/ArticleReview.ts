import mongoose, { Schema, model } from "mongoose";
import { configSchema } from "../configs/modules";
import { EStatusReview } from "../types";

const articleReviewSchema = new Schema({
    articleID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: true
    },
    round:
    {
        type: Number,
        required: true,
        default: 1,
    },
    reviewerID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    editorID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    contentArticleName:
    {
        type: String
    },
    contentReviewName:
    {
        type: String
    },
    status:
    {
        type: Number,
        enum: Object.values(EStatusReview).filter(
            (value) => typeof value === "number"
        ),
    },
    decision:
    {
        type: String
    },
    comments:
    {
        type: String
    }
},
    configSchema
);

export default model('ArticleReview', articleReviewSchema);
