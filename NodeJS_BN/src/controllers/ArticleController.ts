import { ObjectId, Types } from 'mongoose';
import { NextFunction, Request, Response } from "express";
import ArticleServices from '../Services/ArticleServices';
import ArticleRepository from '../Repository/ArticleRepository';
import ProcessServices from '../Services/ProcessServices';
import { EDecision, EStatusArticle, EStatusReview } from '../types';

interface ReqBodyArticle {
    title: string;
    abstract: string;
    keywords: string[];
    authorID: ObjectId;
}
interface ReqBodyReview {
    articleID: ObjectId,
    round: number,
    reviewerID: ObjectId,
    decision: EDecision,
    comments?: string,
}

const createArticle = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        console.log(req.body);
        const { title, abstract, keywords, authorID } = req.body as ReqBodyArticle;

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        console.log(req.file.path);
        const contentUrl = req.file.path;

        // Tạo bài báo mới
        const newArticle = await ArticleServices.newArticle(
            title,
            abstract,
            contentUrl,
            keywords,
            authorID
        );

        const saveArticle = await ArticleRepository.saveArticle(newArticle);

        if (saveArticle) {
            await ProcessServices.createNewArticleProcess(
                new Types.ObjectId(saveArticle._id),
                new Date(),
                'Gửi bài báo'
            );
        }

        return res.status(200).json(saveArticle);
    } catch (error) {
        console.error('Error in createArticle:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const getListArticles = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { page, limit, status } = req.query as {
            page?: number;
            limit?: number;
            status?: EStatusArticle;
        };
        const pageNumber = page || 1;
        const pageSize = limit || 10;
        const find = await ArticleServices.allArticleFilterStatus({
            page: pageNumber,
            limit: pageSize,
            status: status,
        });
        return res.status(200).json({
            articles: find.articles,
            counts: find.counts,
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const getMyArticle = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { page, limit, authorID, status } = req.query as {
            page?: number;
            limit?: number;
            authorID?: ObjectId,
            status?: EStatusArticle;
        };
        console.log(req.query);

        const pageNumber = page || 1;
        const pageSize = limit || 10;
        const find = await ArticleServices.allArticleFilterStatus({
            page: pageNumber,
            limit: pageSize,
            authorID: authorID,
            status: status,
        });
        return res.status(200).json({
            articles: find.articles,
            counts: find.counts,
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const updateArticleReview = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        console.log(req.body);
        const {
            articleID,
            round,
            reviewerID,
            decision,
            comments,
        } = req.body as ReqBodyReview;


        const contentUrl = req.file ? req.file.path : undefined;
        console.log(contentUrl);


        const newArticle = await ArticleServices.updateArticleReview(
            articleID,
            round,
            reviewerID,
            decision,
            contentUrl,
            comments,
        );

        return res.status(200).json('Phản biện thành công');
    } catch (error) {
        console.error('Error in createArticle:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const updateImageAndContentArticlePublic = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { articleID, publisherID } = req.body as { articleID: ObjectId, publisherID: ObjectId };

        const files = req.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const imageUrl = files?.image?.[0]?.path || undefined;
        const contentUrl = files?.contentPublic?.[0]?.path || undefined;

        console.log({ imageUrl, contentUrl });

        const updatedArticle = await ArticleServices.updateImageAndContentPublic(
            articleID,
            publisherID,
            imageUrl,
            contentUrl,
        );

        return res.status(200).json({ message: 'Public Success' });
    } catch (error) {
        console.error('Error in updateImageAndContentArticlePublic:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const decideArticle = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { articleID, decision } = req.body as { articleID: ObjectId, decision: EDecision };


        const Article = await ArticleServices.decideArticle(
            articleID,
            decision,
        );

        return res.status(200).json({ message: 'Gửi bài thành công' });
    } catch (error) {
        console.error('Error in updateImageAndContentArticlePublic:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const updateArticleFromAuthor = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {
        const { articleID } = req.body as { articleID: ObjectId};

        const { title, abstract, keywords } = req.body as ReqBodyArticle;

        if (!articleID) {
            return res.status(400).json({ message: 'articleID is required.' });
        }
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const contentUrl = req.file.path;

        const updatedArticle = await ArticleServices.editArticle(
            articleID,
            title,
            abstract,
            contentUrl,
            keywords,
        );
        return updatedArticle;

    } catch (error) {
        console.error('Error in createArticle:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};


export default {
    createArticle,
    getListArticles,
    getMyArticle,
    updateArticleReview,
    updateImageAndContentArticlePublic,
    decideArticle,
    updateArticleFromAuthor,
};
