import { ObjectId } from "mongoose";
import User from "../models/User";
import { ERoleUser } from "../types";

const getListUsers = async (
    page: number,
    limit: number,
    userID?: ObjectId,
    role?: ERoleUser,
    name?: string,
) => {
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (userID) {
        filter._id = userID;
    }
    if (role) {
        filter.role = role;
    }
    if (name) {
        filter.name = name;
    }

    const Users = await User
        .find(filter)
        .skip(skip)
        .limit(limit)
        .select("-password")
        .sort({ updatedAt: -1 });

    const total = await User.find(filter).countDocuments();

    return {
        data: Users,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        pageSize: limit,
        totalItems: total,
    };
};

const updateUser = async (userID: ObjectId, name: string, email: string) => {
    const user = User.findByIdAndUpdate(
        userID,
        {
            $set: { 
                name: name,
                email: email,
            },
        },
        { new: true }
    )
    return user;
};

const addRoleUser = async (userID: ObjectId, roles: number[]) => {
    const user = await User.findById(userID);
    if (!user) {
        return "User không tồn tại.";
    }

    const updatedRoles = Array.from(new Set([...user.role, ...roles]));

    user.role = updatedRoles;

    const update = await user.save();

    return update;
};

export default {
    updateUser,
    getListUsers,
    addRoleUser
}