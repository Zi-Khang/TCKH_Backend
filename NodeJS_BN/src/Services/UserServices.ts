import { ObjectId } from "mongoose";
import User from "../models/User";
import UserRepository from "../Repository/UserRepository";
const { name } = require('ejs');
require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken");

// const createUserServices = async (email, password) => {
//     const hashPassword = await bcrypt.hash(password, saltRounds)
//     try {
//         const query = 'INSERT INTO Users (email, password) VALUES (?, ?)';
//         const values = [email, hashPassword];

//         await connection.promise().query(query, values, (error, results) => {
//             if (error) {
//                 throw error;
//             }
//             console.log('User inserted:', results);
//         });
//     } catch (error) {
//         console.log('Error in createUserServices:', error);
//         return null;
//     }
//     return 'Tao user moi thanh cong';
// }

// Tạo người dùng
const createUserServices = async (
    name: string, 
    email: string, 
    password: string,
) => {
    const hashPassword = await bcrypt.hash(password, saltRounds)
    try {
        const newUser = await User.create({ name, email, password: hashPassword });
        return newUser;
    } catch (error) {
        console.log('Error in createUser:', error);
        return error;
    }
};

const loginServices = async (
    email: string, 
    password: string,
) => {
    try {
        const user = await User.findOne( { email: email  })
        if (user) {
            console.log(1);
            
            const isMatchPassword = await bcrypt.compare(password, user.password)
            if (!isMatchPassword) {
                return {
                    EC: 1,
                    EM: "Email/Password không hợp lệ",
                }
            } else {
                const payload = {
                    id: user._id,
                    email: email,
                    name: user.name,
                    role: user.role,
                }
                const access_token = jwt.sign(
                    payload,
                    process.env.JWT_SECRET,
                    {
                        expiresIn: process.env.JWT_EXPIRE,
                    }

                )
                return {
                    EC: 0,
                    access_token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                    }
                }
            }
        } else {
            return {
                EC: 2,
                EM: "Email/Password không hợp lệ",
            }
        }
    } catch (error) {
        console.log('Error in createUserServices:', error);
        return null;
    }
}

const updateProfile = async (
    userID: ObjectId,
    name: string, 
) => {
    try {
        const updateProfile = await UserRepository.updateUser(userID, name);
        
        return updateProfile;
    } catch (error) {
        console.log('Error in createUser:', error);
        return error;
    }
};


export default {
    createUserServices,
    loginServices,
    updateProfile
}