import { ObjectId, Types } from 'mongoose'
import { NextFunction, Request, Response } from "express";
import ArticleServices from '../Services/ArticleServices';
import ArticleRepository from '../Repository/ArticleRepository';
import ProcessServices from '../Services/ProcessServices';


interface ReqBodyArticle {
    title: string,
    abstract: string,
    content: string,
    keywords: string[],
    authorID: ObjectId
}
const createArticle = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log(req.body);
        const { title, abstract, content, keywords, authorID } = req.body as ReqBodyArticle;
        const newArticle = await ArticleServices.newArticle(
            title,
            abstract,
            content,
            keywords,
            authorID,
        );
        const saveArticle = await ArticleRepository.saveArticle(newArticle);
        if (saveArticle)
        {
            const saveCreateArticleProcess = ProcessServices.createNewArticleProcess( new Types.ObjectId(saveArticle._id), new Date(), 'Gửi bài báo')
        }
    } catch (error) {
        next(error);
    }

    
    // const contentName = req.file.originalname; // Lấy tên file
    // const contentData = req.file.buffer; // Lấy dữ liệu file dưới dạng buffer
    // try {
    //     const article = await createArticleServices(title, abstract, contentName, contentData, status, authorID, publisherID);
    //     if (article) {
    //         console.log(article);
    //         return res.status(200).json('Gửi bài báo thành công');
    //     } else {
    //         return res.status(405).json('Gửi bài báo thất bại');
    //     }
    // } catch (error) {
    //     console.error(error);
    //     return res.status(500).json('Có lỗi xảy ra');
    // }
}

// const loadArticle = async (req, res) => {
//     const { userID } = req.body;
//     try {
//         const articles = await loadArticleServices(userID);

//         const formattedArticles = articles.map(article => ({
//             ...article.toJSON(),
//             contentData: article.contentData ? article.contentData.toString('base64') : null
//         }));

//         return res.status(200).json(formattedArticles);
//     } catch (error) {
//         console.error('Error loading articles:', error);
//         return res.status(500).json({ error: 'Failed to load articles' });
//     }
// }


module.exports = {
    createArticle,
    // loadArticle,
}