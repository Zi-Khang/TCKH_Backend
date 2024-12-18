import { ObjectId, Types } from "mongoose";
import { EAssigment, EDecision, EField, EStatusArticle, EStatusReview } from "../types";
import ArticleRepository from "../Repository/ArticleRepository";
import ProcessServices from "./ProcessServices";
import ReviewAssignmentRepository from "../Repository/ReviewAssignmentRepository";

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
        if (decision == 1)
            await ReviewAssignmentRepository.findAndUpdateReviewAssignment(reviewerID, articleID, EAssigment.ACCEPT)
        else if (decision == 2)
            await ReviewAssignmentRepository.findAndUpdateReviewAssignment(reviewerID, articleID, EAssigment.REVISION)
        else
            await ReviewAssignmentRepository.findAndUpdateReviewAssignment(reviewerID, articleID, EAssigment.REJECT)
    }
    return {
        article: findArticles,
    };

};

const updateImageAndContentPublic = async (
    articleID: ObjectId,
    publisherID: ObjectId,
    field: EField,
    imageUrl?: string,
    contentUrl?: string,
) => {
    const findArticles = await ArticleRepository.updateImageAndContent(
        articleID,
        publisherID,
        field,
        imageUrl,
        contentUrl,
    );
    if (findArticles) {
        await ProcessServices.updateArticlePublicProccess(
            articleID,
            publisherID,
            new Date(),
            'Đã xuất bản'
        );
        await ArticleRepository.updateStatusArticle(articleID, EStatusArticle.PUBLIC)
    } else {
        return false;
    }
    return {
        article: findArticles,
    };
};


const addArticleToIssue = async (articleID:ObjectId, journalIssueID: ObjectId) => {
    const updatedArticle = await ArticleRepository.updateArticleIssue(articleID, journalIssueID);

    if (!updatedArticle) {
        throw new Error('Article or Issue not found');
    }
    await ProcessServices.createArticleProccess(
        articleID,
        new Date(),
        'Đã đăng lên tạp chí'
    );
    await ArticleRepository.updateStatusArticle(articleID, EStatusArticle.POSTED)

    return updatedArticle;
};

const decideArticle = async (articleID:ObjectId, decision: EDecision) => {

    console.log(articleID, decision);
    
    if (decision == 1){
        await ArticleRepository.updateStatusArticle(articleID, EStatusArticle.PUBLICING);
        await ProcessServices.createArticleProccess(
            articleID,
            new Date(),
            'Duyệt thành công, gửi tới nhà xuất bản'
        );
    } else if (decision == 2) {
        await ArticleRepository.updateStatusArticle(articleID, EStatusArticle.REVISIONING);
        await ProcessServices.createArticleProccess(
            articleID,
            new Date(),
            'Cần chỉnh sửa, gửi lại tác giả'
        );
    } else if (decision == 3)
    {
        await ArticleRepository.updateStatusArticle(articleID, EStatusArticle.REJECT);
        await ProcessServices.createArticleProccess(
            articleID,
            new Date(),
            'Từ chối bài báo'
        );
    }

    return 'Duyệt thành công';
};

const editArticle = async (
    articleID:ObjectId, 
    title: string,
    abstract: string,
    contentUrl: string,
    keywords: string[],
) => {
    try {
        const updatedArticle = await ArticleRepository.updateArticle(
            articleID, 
            title,
            abstract,
            contentUrl,
            keywords,
        );
        if (updatedArticle) {
            await ProcessServices.createArticleProccess(
                articleID,
                new Date(),
                'Đã chỉnh sửa'
            );
            const updateStatus = await ArticleRepository.updateStatusArticle(articleID, EStatusArticle.COMPLETE)
            console.log(updateStatus);
        }
        if (!updatedArticle) {
            throw new Error('Article not found');
        }
    
        return updatedArticle;
    } catch (error) {
        console.log(error);
        return error;
    }
    
};


export default {
    newArticle,
    allArticleFilterStatus,
    updateArticleReview,
    updateImageAndContentPublic,
    addArticleToIssue,
    decideArticle,
    editArticle
};
