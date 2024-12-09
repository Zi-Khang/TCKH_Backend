import { ObjectId, Types } from "mongoose";
import ProcessRepository from "../Repository/ProcessRepository";

const createNewArticleProcess = async (
    articleID: Types.ObjectId,
    time?: Date,
    note?: string,
) => {
    const process = {
        articleID: articleID,
        time: time,
        note: note,
    };
    const Process = await ProcessRepository.saveProccess(process);
    return Process;
};
const assignReviewerProcess = async (
    articleID?: ObjectId,
    reviewerID?: ObjectId,
    time?: Date,
    note?: string,
) => {
    const process = {
        articleID: articleID,
        reviewerID: reviewerID,
        time: time,
        note: note,
    };
    const Process = await ProcessRepository.saveProccess(process);
    return Process;
};

const updateArticleReviewProccess = async (
    articleID?: ObjectId,
    reviewerID?: ObjectId,
    time?: Date,
    note?: string,
) => {
    const process = {
        articleID: articleID,
        reviewerID: reviewerID,
        time: time,
        note: note,
    };
    const Process = await ProcessRepository.saveProccess(process);
    return Process;
};
const updateArticlePublicProccess = async (
    articleID?: ObjectId,
    publisherID?: ObjectId,
    time?: Date,
    note?: string,
) => {
    const process = {
        articleID: articleID,
        publisherID: publisherID,
        time: time,
        note: note,
    };
    const Process = await ProcessRepository.saveProccess(process);
    return Process;
};

export default {
    createNewArticleProcess,
    assignReviewerProcess,
    updateArticleReviewProccess,
    updateArticlePublicProccess,
}