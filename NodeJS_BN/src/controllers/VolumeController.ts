import { ObjectId, Types } from 'mongoose';
import { NextFunction, Request, Response } from "express";
import VolumeServices from '../Services/VolumeServices';

const createVolume = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
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

const getVolumeList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const data = await VolumeServices.getVolumeList()

        if (data) {
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ EC: 1, EM: "Failed to create user" });
    }
} 


export default {
    createVolume,
    getVolumeList
}