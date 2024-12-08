import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import ReviewAssignmentServices from "../Services/ReviewAssignmentServices";


const getReviewerList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { articleID } = req.body as {
            articleID: ObjectId,
        };
        const find = await ReviewAssignmentServices.getListReviewrAvailable({
            articleID,
        });
        res.status(200).json({
            find
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const assignReviewer = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { articleID, reviewerID } = req.body as {
            articleID: ObjectId,
            reviewerID: ObjectId,
        };
        const find = await ReviewAssignmentServices.assignReviewer({
            articleID,
            reviewerID,
        });
        res.status(200).json({
            find
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export default {
    getReviewerList,
    assignReviewer
}