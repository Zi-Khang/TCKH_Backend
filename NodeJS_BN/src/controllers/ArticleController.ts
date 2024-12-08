import { ObjectId, Types } from 'mongoose';
import { NextFunction, Request, Response } from "express";
import ArticleServices from '../Services/ArticleServices';
import ArticleRepository from '../Repository/ArticleRepository';
import ProcessServices from '../Services/ProcessServices';
import { EStatusArticle } from '../types';

interface ReqBodyArticle {
    title: string;
    abstract: string;
    keywords: string[];
    authorID: ObjectId;
}

const createArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log(req.body);
        const { title, abstract, keywords, authorID } = req.body as ReqBodyArticle;

        if (!req.file) {
            res.status(400).json({ message: 'No file uploaded' });
            return
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

        res.status(200).json(saveArticle);
    } catch (error) {
        console.error('Error in createArticle:', error);
        res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const getListArticles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
        res.status(200).json({
            articles: find.articles,
            counts: find.counts,
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export default {
    createArticle,
    getListArticles,
};
