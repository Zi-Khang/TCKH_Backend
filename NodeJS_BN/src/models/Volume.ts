import mongoose, { Schema, model } from "mongoose";
import { configSchema } from "../configs/modules";

const VolumeSchema = new Schema({
    volumeNumber: {
        type: Number,
        required: true,
    },
    volumeName:{
        type: String,
        require: true,
    }
},
    configSchema
);

export default model("Volume", VolumeSchema);
