import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import ReviewAssignmentServices from "../Services/ReviewAssignmentServices";
import { EAssigment } from "../types";


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

const viewAssignmentList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { reviewerID } = req.body as {
            reviewerID: ObjectId,
        };
        const find = await ReviewAssignmentServices.viewAssignmentList({
            reviewerID,
        });
        res.status(200).json({
            find
        });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

const chooseAssignments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { reviewerID, articleID, choose } = req.body as {
            reviewerID: ObjectId,
            articleID: ObjectId,
            choose: EAssigment,
        };
        console.log(req.body);
        const find = await ReviewAssignmentServices.chooseAssignment({
            reviewerID,
            articleID,
            choose,
        });
        if (find)
        {
            res.status(200).json(
                "Chọn thành công"
            );
        } else{
            res.status(500).json("Lựa chọn thất bại");
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

export default {
    getReviewerList,
    assignReviewer,
    viewAssignmentList,
    chooseAssignments
}