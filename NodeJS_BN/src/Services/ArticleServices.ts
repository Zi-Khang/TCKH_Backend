import { ObjectId, Types } from "mongoose";
import { EDecision, EStatusArticle, EStatusReview } from "../types";
import ArticleRepository from "../Repository/ArticleRepository";
import ProcessServices from "./ProcessServices";

const newArticle = async (
    title: string,
    abstract: string,
    contentUrl: string,
    keywords: string[],
    authorID: ObjectId
) => {
    return {
        title,
        abstract,
        content: contentUrl, // Lưu URL của file
        keywords,
        status: EStatusArticle.PENDING,
        authorID,
    };
};

const allArticleFilterStatus = async ({
    page,
    limit,
    authorID,
    status,
}: {
    page: number;
    limit: number;
    authorID?: ObjectId,
    status?: EStatusArticle;
}) => {
    const findArticles = await ArticleRepository.findArticlesByStatus(
        page,
        limit,
        authorID,
        status,
    );
    const [
        countPending,
        countAssigning,
        countReviewing,
        countRevisioning,
        countComplete,
        countPublic,
        countReject,
    ] = await Promise.all([
        ArticleRepository.sumCountAllArticle(EStatusArticle.PENDING),
        ArticleRepository.sumCountAllArticle(EStatusArticle.ASSIGNED),
        ArticleRepository.sumCountAllArticle(EStatusArticle.REVIEWED),
        ArticleRepository.sumCountAllArticle(EStatusArticle.REVISIONING),
        ArticleRepository.sumCountAllArticle(EStatusArticle.COMPLETE),
        ArticleRepository.sumCountAllArticle(EStatusArticle.PUBLIC),
        ArticleRepository.sumCountAllArticle(EStatusArticle.REJECT),
    ]);
    return {
        articles: findArticles,
        counts: {
            pending: countPending,
            assigning: countAssigning,
            reviewing: countReviewing,
            revisioning: countRevisioning,
            complete: countComplete,
            public: countPublic,
            reject: countReject,
        },
    };
};

const updateArticleReview = async (
    articleID: ObjectId,
    round: number,
    reviewerID: ObjectId,
    decision: EDecision,
    contentUrl?: string,
    comments?: string,
) => {
    const findArticles = await ArticleRepository.updateArticleReview(
        articleID,
        round,
        reviewerID,
        decision,
        contentUrl,
        comments,
    );
    if (findArticles) {
        await ProcessServices.updateArticleReviewProccess(
            articleID,
            reviewerID,
            new Date(),
            'Đã Phản biện'
        );
        await ArticleRepository.updateStatusArticle(articleID, EStatusArticle.REVIEWED)
    }
    return {
        article: findArticles,
    };

};

export default {
    newArticle,
    allArticleFilterStatus,
    updateArticleReview
};
