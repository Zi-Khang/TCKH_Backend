import mongoose from "mongoose";

const MONGODB = process.env.MONGODB || "";

console.log(MONGODB);

const optionConfig = {};

export const connectMongoDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://ViKhangCuteVcl:ViKhangCuteVcl@cluster0.33e2t.mongodb.net/scientificJournal?retryWrites=true&w=majority&appName=Cluster0', optionConfig);
        console.log("Connect MongoDB Successfully!");
    } catch (error) {
        console.log("Connect MongoDB Fail!", error);
    }
};
