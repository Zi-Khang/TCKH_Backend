import { Schema, model } from "mongoose";
import { configSchema } from "../configs/modules";
import { ERoleUser, EGender } from "../types";

const userSchema = new Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true
        },
        gender:
        {
            type: Number,
            enum: Object.values(EGender).filter(
                (value) => typeof value === "number"
            )
        },
        address:
        {
            type: String
        },
        organization:
        {
            type: String
        },
        role: {
            type: [Number], 
            enum: Object.values(ERoleUser).filter(
                (value) => typeof value === "number"
            ),
            default: 1,
        }
        
    },
    configSchema
);

export default model('User', userSchema);
