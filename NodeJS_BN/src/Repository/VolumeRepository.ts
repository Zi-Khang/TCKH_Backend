import Volume from "../models/Volume";


const createVolume = async (
    volumeNumber: number,
    volumeName: string,
) => {
    const volume = {
        volumeNumber,
        volumeName,
    }
    const Volumes = await new Volume(volume).save();
    
    return {
        Volumes,
    };
};

const getVolumeList = async () => {
    const Volumes = await Volume.find({});
    
    return {
        Volumes,
    };
};

export default {
    createVolume,
    getVolumeList
}