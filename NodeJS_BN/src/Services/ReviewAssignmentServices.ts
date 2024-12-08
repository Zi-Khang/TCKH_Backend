import { ObjectId, Types } from "mongoose";
import ReviewAssignmentRepository from "../Repository/ReviewAssignmentRepository";
import ProcessServices from "./ProcessServices";
import ArticleRepository from "../Repository/ArticleRepository";
import { EStatusArticle } from "../types";

const getListReviewrAvailable = async ({
    articleID,
}: {
    articleID: ObjectId,
}) => {
    const { Reviewers: rejectedReviewers } = await ReviewAssignmentRepository.findReviewer(
        articleID,
    );
    console.log(rejectedReviewers);
    const rejectedReviewerIDs = rejectedReviewers
        .map(reviewer => reviewer.reviewerID)
        .filter((id): id is Types.ObjectId => id instanceof Types.ObjectId);


    const availableReviewers = await ReviewAssignmentRepository.findReviewersAvailable(
        rejectedReviewerIDs,
    );
    console.log(availableReviewers);
    

    return {
        availableReviewers,
    };
};

const assignReviewer = async ({
    articleID,
    reviewerID,
}: {
    articleID: ObjectId,
    reviewerID: ObjectId,
}) => {
    const createAssign = await ReviewAssignmentRepository.createAssign(
        articleID,
        reviewerID,
    );
    const time = new Date();
    const note = 'Phân công phản biện';
    if (createAssign) {
        await ProcessServices.assignReviewerProcess(
            articleID,  
            reviewerID,
            time,
            note,       
        );
        const updateArticle = await ArticleRepository.updateStatusArticle(articleID, EStatusArticle.ASSIGNING)
        if (updateArticle) {
            console.log('Thành công');
        }
    }

    return {
        createAssign
    };
};

export default {
    getListReviewrAvailable,
    assignReviewer
}