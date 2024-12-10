import { ObjectId } from "mongoose";
import JournalIssueRepository from "../Repository/JournalIssueRepository";

const createIssue = async (issueData: any) => {
    return await JournalIssueRepository.createJournalIssue(issueData);
};
const getIssuesForVolume = async (volumeID: ObjectId) => {
    return await JournalIssueRepository.getIssuesByVolume(volumeID);
};

export default {
    createIssue,
    getIssuesForVolume
}
