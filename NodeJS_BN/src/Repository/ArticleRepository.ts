import { ObjectId } from "mongoose";
import Article from "../models/Article";
import { EDecision, EStatusArticle, EStatusReview } from "../types";


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
        .select("-keywords -reviews")
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
    imageUrl?: string,
    contentUrl?: string,
) => {
    try {

        const article = Article.findByIdAndUpdate(
            articleID,
            {
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

const updateArticleIssue = async (articleID:ObjectId, journalIssueID: ObjectId) => {
    return await Article.findByIdAndUpdate(
        articleID,
        { journalIssue: journalIssueID },
        { new: true }
    ).exec();
};


const updateArticle = async (
    articleID:ObjectId, 
    title: string,
    abstract: string,
    contentUrl: string,
    keywords: string[],
) => {
    return await Article.findByIdAndUpdate(
        articleID,
        { $set: {
            title: title,
            abstract: abstract,
            content:contentUrl ,
            keywords: keywords,
        }
        },
        { new: true, runValidators: true }
    ).exec();
};


export default {
    saveArticle,
    findArticlesByStatus,
    sumCountAllArticle,
    updateStatusArticle,
    updateArticleReview,
    updateImageAndContent,
    updateArticleIssue,
    updateArticle
}