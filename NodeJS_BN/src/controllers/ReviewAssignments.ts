import { NextFunction, Request, Response } from "express";
import { ObjectId } from "mongoose";
import ReviewAssignmentServices from "../Services/ReviewAssignmentServices";
import { EAssigment } from "../types";
import { response, roundNumber } from "../helpers/index";

const getReviewerList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { articleID } = req.body as {
            articleID: ObjectId,
        };
        const find = await ReviewAssignmentServices.getListReviewrAvailable({
            articleID,
        });
        return res.status(200).json({
            find
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const assignReviewer = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { articleID, reviewerID } = req.body as {
            articleID: ObjectId,
            reviewerID: ObjectId,
        };
        if (!articleID || !reviewerID)
            return response({
                res,
                status: 404,
                result: null,
                message: "idUser and refresh token is required.",
            })
        console.log(1);
        const find = await ReviewAssignmentServices.assignReviewer({
            articleID,
            reviewerID,
        });
        res.status(200).json({
            find
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const viewAssignmentList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { reviewerID } = req.body as {
            reviewerID: ObjectId,
        };
        const find = await ReviewAssignmentServices.viewAssignmentList({
            reviewerID,
        });
        return res.status(200).json({
            find
        });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

const chooseAssignments = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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
            return res.status(200).json(
                "Chọn thành công"
            );
        } else{
            return res.status(500).json("Lựa chọn thất bại");
        }
    } catch (error) {
        return res.status(500).json({ message: error });
    }
};

export default {
    getReviewerList,
    assignReviewer,
    viewAssignmentList,
    chooseAssignments
}