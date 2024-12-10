import { ObjectId } from "mongoose";
import VolumeRepository from "../Repository/VolumeRepository";
import ProcessServices from "./ProcessServices";

const createVolume = async (
    managerID: ObjectId,
    volumeNumber: number,
    volumeName: string,
) => {
    const findArticles = await VolumeRepository.createVolume(
        volumeNumber,
        volumeName,
    );
    if (findArticles) {
        await ProcessServices.updateArticleCreateVolumeProccess(
            managerID,
            new Date(),
            'Tạo Volume'
        );
    }
    return {
        Volume: findArticles,
    };

};

export default {
    createVolume,
    
}