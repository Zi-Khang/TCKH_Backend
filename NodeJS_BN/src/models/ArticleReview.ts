import mongoose, { Schema, model } from "mongoose";
import { configSchema } from "../configs/modules";
import { EStatusReview } from "../types";

const articleReviewSchema = new Schema({
    articleID:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        require: true,
    },
    assessorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    rate: {
        type: Number,
        require: true
    }

},
    configSchema
);

export default model('ArticleReview', articleReviewSchema);
