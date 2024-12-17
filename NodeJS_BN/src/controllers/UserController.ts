import { NextFunction, Request, Response } from "express";
import { UserService } from '../Services';
import { ObjectId } from "mongoose";

const createUser = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
    try {
        console.log("Check: ", req.body);
        const { name, email, password} = req.body;
        const data = await UserService.createUserServices(name, email, password)
        if (data) {
            return res.status(200).json(data);
        }
    } catch (error) {
        return res.status(500).json({ EC: 1, EM: "Failed to create user" });
    }
  
}    
const loginUser = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
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

const updateUserProfile = async (req: Request, res: Response, next: NextFunction) : Promise<any> => {
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
            return res.status(200).json({message: 'Update user success', result});
        } else {
            return res.status(400).json({ EC: 1, EM: "Failed to update user" });
        }

    } catch (error) {
        console.error("Error in loginUser:", error);
        return res.status(500).json({ EC: 1, EM: "Failed to login user" });
    }
};


export default {
    createUser,
    loginUser,
    updateUserProfile
};
