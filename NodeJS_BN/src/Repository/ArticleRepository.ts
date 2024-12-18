import mongoose, {Types, ObjectId } from "mongoose";
import Article from "../models/Article";
import { EDecision, EField, EStatusArticle, EStatusReview } from "../types";
import ArticleReview from "../models/ArticleReview";


const saveArticle = async (article: Object) => {
    const res = await new Article(article).save();
    return res;
};

const updateStatusArticle = async (articleID: ObjectId, status: EStatusArticle) => {
    try {
        console.log(articleID, status);
        const updatedArticle = await Article.findByIdAndUpdate(
            articleID,
            {
                status: status
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedArticle) {
            throw new Error(`Article with ID ${articleID} not found`);
        }

        return updatedArticle;
    } catch (error) {
        console.error("Error updating article status:", error);
        throw error;
    }
};


const findArticlesByStatus = async (
    page: number,
    limit: number,
    authorID?: ObjectId,
    status?: EStatusArticle
) => {
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (status) {
        filter.status = status;
    }
    if (authorID) {
        filter.authorID = authorID;
    }

    const Articles = await Article
        .find(filter)
        .skip(skip)
        .limit(limit)
        .select("-keywords")
        .populate({
            path: "authorID",
            select: "name"
        })
        .sort({ updatedAt: -1 });

    const total = await Article.find(filter).countDocuments();

    return {
        data: Articles,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        pageSize: limit,
        totalItems: total,
    };
};


const sumCountAllArticle = async (status: EStatusArticle) => {
    const article = await Article.countDocuments({
        status: status,
    });
    return article;
};

const updateArticleReview = async (
    articleID: ObjectId,
    round: number,
    reviewerID: ObjectId,
    decision: EDecision,
    contentUrl?: string,
    comments?: string
) => {
    try {
        const review = {
            round,
            reviewerID,
            contentReview: contentUrl,
            decision: decision,
            comments: comments,
        };

        const article = Article.findByIdAndUpdate(
            articleID,
            {
                $push: { reviews: review },
            },
            { new: true }
        );

        return article;
    } catch (error) {
        return error;
    }
};

const updateImageAndContent = async (
    articleID: ObjectId,
    publisherID: ObjectId,
    field: EField,
    imageUrl?: string,
    contentUrl?: string,
) => {
    try {
        const article = Article.findByIdAndUpdate(
            articleID,
            {
                field: field,
                image: imageUrl,
                contentPublic: contentUrl,
                publisherID: publisherID,
            },
            {
                new: true
            }
        );

        return article;
    } catch (error) {
        return error;
    }
};

const updateArticleIssue = async (articleID: ObjectId, journalIssueID: ObjectId) => {
    return await Article.findByIdAndUpdate(
        articleID,
        { journalIssue: journalIssueID },
        { new: true }
    ).exec();
};


const updateArticle = async (
    articleID: ObjectId,
    title: string,
    abstract: string,
    contentUrl: string,
    keywords: string[],
) => {
    return await Article.findByIdAndUpdate(
        articleID,
        {
            $set: {
                title: title,
                abstract: abstract,
                content: contentUrl,
                keywords: keywords,
            }
        },
        { new: true, runValidators: true }
    ).exec();
};

const rate = async (
    articleID: ObjectId,
    assessorId: ObjectId,
    rate: number
) => {
    const createRate = await ArticleReview.create({ articleID, assessorId, rate });
    return createRate;
};


const getRate = async (articleID: string | ObjectId) => {
    const objectIdArticleID =
        typeof articleID === "string"
            ? new mongoose.Types.ObjectId(articleID)
            : articleID;

    console.log("Converted articleID:", objectIdArticleID);

    const result = await ArticleReview.aggregate([
        {
            $match: {
                articleID: objectIdArticleID, 
            },
        },
        {
            $group: {
                _id: "$articleID",
                averageRate: { $avg: "$rate" },
            },
        },
    ]);

    console.log("Aggregation result:", result);

    if (result.length === 0) {
        return 0; 
    }

    return Math.ceil(result[0].averageRate); 
};



export default {
    saveArticle,
    findArticlesByStatus,
    sumCountAllArticle,
    updateStatusArticle,
    updateArticleReview,
    updateImageAndContent,
    updateArticleIssue,
    updateArticle,
    rate,
    getRate
}