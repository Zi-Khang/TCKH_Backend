import { ObjectId, Types } from "mongoose";
import ProcessRepository from "../Repository/ProcessRepository";

const createNewArticleProcess = async (
    articleID: Types.ObjectId,
    time: Date,
    note: string,
) => {
    const process = {
        articleID: articleID,
        time: time,
        note: note,
    };
    const Process = ProcessRepository.saveProccess(process);
    return Process;
};

export default {
    createNewArticleProcess,
}