import { ObjectId } from "mongoose";
import { EStatusArticle } from "../types";
import ArticleRepository from "../Repository/ArticleRepository";

const newArticle = async (
    title: string,
    abstract: string,
    contentUrl: string, // Thay đổi từ File sang string
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
        ArticleRepository.sumCountAllArticle(EStatusArticle.ASSIGNING),
        ArticleRepository.sumCountAllArticle(EStatusArticle.REVIEWING),
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

export default {
    newArticle,
    allArticleFilterStatus,
};
