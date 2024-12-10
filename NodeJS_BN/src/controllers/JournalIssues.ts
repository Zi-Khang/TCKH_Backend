
import { Request, Response, NextFunction } from 'express';
import JournalIssueServices from "../Services/JournalIssueServices";
import { ObjectId } from 'mongoose';


const createJournalIssue = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { volumeID, issueNumber, issueTitle, managerID } = req.body;
        
        if (!volumeID || !issueNumber) {
            return res.status(400).json({ message: 'volumeID and issueNumber are required.' });
        }

        const newIssue = await JournalIssueServices.createIssue({
            volumeID,
            issueNumber,
            issueTitle,
            managerID,
        });

        return res.status(201).json(newIssue);
    } catch (error) {
        console.error('Error creating issue:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};

const getIssuesByVolume = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { volumeID } = req.body as { volumeID: ObjectId};

        if (!volumeID) {
            return res.status(400).json({ message: 'volumeID is required.' });
        }

        const issues = await JournalIssueServices.getIssuesForVolume(volumeID);

        return res.status(200).json(issues);
    } catch (error) {
        console.error('Error fetching issues by volume:', error);
        return res.status(500).json({ message: 'Internal Server Error', error });
    }
};




export default {
    createJournalIssue,
    getIssuesByVolume
}