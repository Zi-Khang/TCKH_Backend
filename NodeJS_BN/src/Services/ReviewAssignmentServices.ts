import { ObjectId, Types } from "mongoose";
import ReviewAssignmentRepository from "../Repository/ReviewAssignmentRepository";
import ProcessServices from "./ProcessServices";
import ArticleRepository from "../Repository/ArticleRepository";
import { EAssigment, EStatusArticle } from "../types";

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

const viewAssignmentList = async ({
    reviewerID,
}: {
    reviewerID: ObjectId,
}) => {
    const Assignments = await ReviewAssignmentRepository.findAssignmentsList(
        reviewerID,
    );

    return {
        Assignments
    };
};

const chooseAssignment = async ({
    reviewerID,
    articleID,
    choose,
}: {
    reviewerID: ObjectId,
    articleID: ObjectId,
    choose: EAssigment,
}) => {

    const Assignments = await ReviewAssignmentRepository.findAndUpdateReviewAssignment
    (
        reviewerID,
        articleID,
        choose,
    );
    console.log(Assignments);
    if (Assignments) {
        const time = new Date();
        if (choose == EAssigment.ACCEPT) {
            await ProcessServices.assignReviewerProcess(
                articleID,  
                reviewerID,
                time,
                'Chấp nhận phản biện',       
            );
            const updateArticle = await ArticleRepository.updateStatusArticle(articleID, EStatusArticle.REVIEWING)
        } else {
            await ProcessServices.assignReviewerProcess(
                articleID,  
                reviewerID,
                time,
                'Từ chối phản biện',       
            );
            const updateArticle = await ArticleRepository.updateStatusArticle(articleID, EStatusArticle.PENDING)
        }
    }

    return {
        Assignments
    };
};

export default {
    getListReviewrAvailable,
    assignReviewer,
    viewAssignmentList,
    chooseAssignment
}