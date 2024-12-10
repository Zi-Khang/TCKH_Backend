import { ObjectId, Types } from 'mongoose';
import { NextFunction, Request, Response } from "express";
import ArticleServices from '../Services/ArticleServices';
import ArticleRepository from '../Repository/ArticleRepository';
import ProcessServices from '../Services/ProcessServices';
import { EDecision, EStatusArticle, EStatusReview } from '../types';
import Volume from '../models/Volume';
import VolumeServices from '../Services/VolumeServices';

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { volumeNumber, volumeName, managerID } = req.body as {
            managerID: ObjectId,
            volumeNumber: number,
            volumeName: string,
        };
        const data = await VolumeServices.createVolume(
            managerID,
            volumeNumber,
            volumeName,
        )
        if (data) {
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ EC: 1, EM: "Failed to create user" });
    }
} 


export default 