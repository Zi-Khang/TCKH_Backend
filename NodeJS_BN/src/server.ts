require('dotenv').config();
import path from "path";
import { connectMongoDB } from "./configs/database";
import express from "express";
import cors from "cors";
import { definedRoutes } from "./routes";
const webRouterAPI = require('./routes/api')


const app = express();
connectMongoDB();


app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

definedRoutes(app)

// app.use('/v1/api', webRouterAPI);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});
app.use((req, res, next) => {
    res.status(404).json({ error: "Route not found" });
});

// (async () => {
//     try {
//         const user = await User.findByPk(3, {
//             raw: true, // Trả về kết quả đơn giản thay vì đối tượng Sequelize
//             attributes: ['userID', 'email', 'name', 'password'] // Chỉ chọn các cột cần thiết
//         });
        
//         console.log(user); // In ra danh sách người dùng với chỉ các trường id, email, password
//     } catch (error) {
//         console.error('Error fetching users:', error);
//     }
// })();

