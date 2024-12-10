import { ObjectId } from "mongoose";
import JournalIssues from "../models/JournalIssues";


const createJournalIssue = async (issueData: any) => {
    const issue = new JournalIssues(issueData);
    return await issue.save();
};

const getIssuesByVolume = async (volumeID: ObjectId) => {
    return await JournalIssues.find({ volumeID }).exec();
};

export default {
    createJournalIssue,
    getIssuesByVolume
}
