import { NextFunction, Request, Response } from "express";
import { UserService } from '../Services';

const createUser = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        console.log("Check: ", req.body);
        const { name, email, Password} = req.body;
        const data = await UserService.createUserServices(name, email, Password)
        if (data) {
            res.status(200).json(data);
        }
    } catch (error) {
        return next(error)
    }
  
}    
const loginUser = async (req: Request, res: Response, next: NextFunction) : Promise<void> => {
    try {
        console.log("Check: ", req.body);
        const { email, password } = req.body;
        const result = await UserService.loginServices(email, password);
        if (result) {
            res.status(200).json(result);
        } else {
            res.status(500).json({ EC: 1, EM: "Failed to create user" });
        }
    } catch (error) {
        console.error("Error in loginUser:", error);
        next(error); // Chuyển lỗi tới middleware xử lý lỗi
    }
};



export default {
    createUser,
    loginUser,
};
