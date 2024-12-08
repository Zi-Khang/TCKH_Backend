import Article from "../models/Article";
import { EStatusArticle } from "../types";


const saveArticle = async (article: Object) => {
    const res = await new Article(article).save();
    return res;
};

const findArticlesByStatus = async (
    page: number,
    limit: number,
    status?: EStatusArticle
) => {
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (status) {
        filter.status = status;
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

    // Tính tổng số lượng đơn hàng
    const total = await Article.find(filter).countDocuments();

    // Trả về kết quả
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

export default {
    saveArticle,
    findArticlesByStatus,
    sumCountAllArticle
}