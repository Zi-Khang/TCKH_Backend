import { ObjectId, Types } from "mongoose";
import Article from "../models/Article";
import { EStatusArticle } from "../types";


const newArticle = async (
    title: string,
    abstract: string,
    content: string,
    keywords: string[],
    authorID: ObjectId
) => {
    const product = {
        title: title,
        abstract: abstract,
        content: content,
        keywords: keywords,
        status: EStatusArticle.PENDING,
        authorID: authorID,
    };
    return product;
};



export default {
    newArticle,
}


// const createArticleServices = async (title, abstract, contentName, contentData, status, authorID) => {
//     try {
//         const newArticle = await Article.create({ title, abstract, contentName, contentData, status, authorID, publisherID });
//         if (newArticle) {
//             const articleID = newArticle.articleID;
//             const time = new Date();
//             const note = 'Tạo bài báo và gửi'
//             const process = await Process.create({articleID, time, note})
//         }
//         return newArticle;
//     } catch (error) {
//         console.log('Error in createUser:', error.message);
//         return error.message;
//     }
// };


// const loadArticleServices = async (authorID) => {
//     try {
//         const articles = await Article.findAll({where: {authorID} });
//         return articles;
//     } catch (error) {
//         console.log('Error in createUser:', error.message);
//         return error.message;
//     }
// };
