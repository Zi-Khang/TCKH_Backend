import { ObjectId, Types } from "mongoose";
import Review_Assignments from "../models/Review_Assignments";
import { EAssigment } from "../types";
import User from "../models/User";


const findReviewer = async (
    articleID: ObjectId,
) => {
    const filter: any = {};

    
    filter.articleID = articleID;
    filter.status = EAssigment.REJECT;
    console.log(filter);
    
    const Reviewers = await Review_Assignments
        .find(filter)
        .select("reviewerID")
    return {
        Reviewers,
    };
};

const findReviewersAvailable = async (
    rejectedReviewerIDs: Types.ObjectId[]
) => {
    const filter: any = {
        _id: { $nin: rejectedReviewerIDs }, 
        role: 2, 
    };

    const Reviewers = await User
        .find(filter)
        .select("reviewerID name"); 

    
    return {
        Reviewers,
    };
};
const createAssign = async (
    articleID: ObjectId,
    reviewerID: ObjectId,
) => {
    const assign = {
        reviewerID,
        articleID,
        status: EAssigment.PENDING
    }
    const Assign = await new Review_Assignments(assign).save();
    
    return {
        Assign,
    };
};

export default {
    findReviewer,
    findReviewersAvailable,
    createAssign,

}