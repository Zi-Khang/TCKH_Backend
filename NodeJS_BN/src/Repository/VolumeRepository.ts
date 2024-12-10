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

export default {
    createVolume
}