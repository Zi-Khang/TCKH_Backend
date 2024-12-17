import { NextFunction, Request, Response } from "express";
import { UserService } from '../Services';
import { ObjectId } from "mongoose";
import { ERoleUser } from "../types";
import UserRepository from "../Repository/UserRepository";

const createUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        console.log("Check: ", req.body);
        const { name, email, password } = req.body;
        const data = await UserService.createUserServices(name, email, password)
        if (data) {
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ EC: 1, EM: "Failed to create user" });
    }

}
const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        console.log("Check: ", req.body);
        const { email, password } = req.body;
        const result = await UserService.loginServices(email, password);
        if (result) {
            return res.status(200).json(result);
        } else {
            return res.status(500).json({ EC: 1, EM: "Failed to create user" });
        }
    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({ EC: 1, EM: "Failed to login user" });
    }
};

const updateUserProfile = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        console.log("Check: ", req.body);

        const { userID, name } = req.body as {
            userID: ObjectId,
            name: string,
        };

        if (!userID) {
            return res.status(400).json('userID is required')
        }
        if (!name) {
            return res.status(400).json('Name is required')
        }

        const result = await UserService.updateProfile(userID, name);

        if (result) {
            return res.status(200).json({ message: 'Update user success', result });
        } else {
            return res.status(400).json({ EC: 1, EM: "Failed to update user" });
        }

    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({ EC: 1, EM: "Failed to login user" });
    }
};

const getListUsers = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { page, limit, userID, role, name } = req.query as {
            page?: number;
            limit?: number;
            userID?: ObjectId;
            role?: ERoleUser;
            name?: string;
        };
        const pageNumber = page || 1;
        const pageSize = limit || 10;

        const Users = await UserRepository.getListUsers(
            pageNumber,
            pageSize,
            userID,
            role,
            name
        );
        if (Users) {
            return res.status(200).json({
                users: Users.data,
                currentPage: Users.currentPage,
                totalPages: Users.totalItems,
                pageSize: Users.pageSize,
                totalUsers: Users.totalItems,
            });
        } else {
            res.status(400).json('Không tìm thấy User phù hợp')
        }

    } catch (error) {
        return res.status(500).json({ message: error });
    }
};


const updateRole = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        // Lấy userID và roles từ req.body
        let { userID, roles } = req.body as {
            userID: ObjectId,
            roles: number | number[] | string,
        };

        if (!userID || roles === undefined) {
            return res.status(400).json({ message: "userID và roles là bắt buộc." });
        }

        let roleArray: number[] = [];
        if (typeof roles === "string") {
            roleArray = roles
                .split(",")
                .map((role) => Number(role.trim()))
                .filter((role) => !isNaN(role));
        } else if (typeof roles === "number") {
            roleArray = [roles];
        } else if (Array.isArray(roles)) {
            roleArray = roles.filter((role) => typeof role === "number" && !isNaN(role));
        }

        if (roleArray.length === 0) {
            return res.status(400).json({ message: "Dữ liệu roles không hợp lệ." });
        }


        const updatedUser = await UserRepository.addRoleUser(userID, roleArray);

        if (!updatedUser) {
            return res
                .status(400)
                .json({ message: "Phân quyền cho User không thành công, vui lòng thử lại." });
        }
        return res.status(200).json({
            message: "Cập nhật role thành công.",
            data: updatedUser,
        });
    } catch (error) {
        console.error("Error in updateRole:", error);
        return res.status(500).json({
            message: "Đã xảy ra lỗi trong quá trình xử lý.",
            error: error
        });
    }
};


export default {
    createUser,
    loginUser,
    updateUserProfile,
    getListUsers,
    updateRole
};
