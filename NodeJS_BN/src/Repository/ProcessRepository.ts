import Process from "../models/Process";


const saveProccess = async (process: Object) => {
    const res = await new Process(process).save();
    return res;
};

export default {
    saveProccess,
}