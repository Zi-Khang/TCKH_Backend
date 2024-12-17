import { ObjectId } from "mongoose";
import User from "../models/User";


const updateUser = async (userID: ObjectId, name:string) => {
    const user = User.findByIdAndUpdate(
        userID,
        {
            $set: { name: name },
        },
        { new: true }
    )
    return user;
};

export default {
    updateUser
}