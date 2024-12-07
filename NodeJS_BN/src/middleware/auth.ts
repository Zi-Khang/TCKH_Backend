// require('dotenv').config();
// const jwt = require("jsonwebtoken");

// const auth = async (
//     req: Request,
//     res: Response,
//     next: NextFunction,
// ) => {
//     const whiteLists = ['/register', '/login']
//     if (whiteLists.find(item => '/v1/api' + item === req.url)) {
//         console.log('Bo qua auth');
//         next();
//     } else {
//         if (req?.headers?.authorization?.split(' ')?.[1]) {
//             const token = req.headers.authorization.split(' ')[1];

//             //verify
//             try {
//                 const decoded = jwt.verify(token, process.env.JWT_SECRET);
//                 console.log('Decoded: ', decoded);
//                 next();
//             } catch (error) {
//                 return response({
//                     res,
//                     status: STATUS.NOT_FOUND,
//                     result: null,
//                     message: "Product not found.",
//                 });
//             }
//         } else {
//             return res.status(401).json({
//                 message: "Khong co acctoken hoac da het han"
//             })
//         }
//     }

// }

// module.exports = {
//     auth,
// }