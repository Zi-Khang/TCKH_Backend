import { ObjectId } from "mongoose";
import { EStatusArticle } from "../types";

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

export default {
    newArticle,
};
