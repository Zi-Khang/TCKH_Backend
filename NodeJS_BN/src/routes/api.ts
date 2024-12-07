import express, { Router } from "express";
import { UserController } from "../controllers";
// const routerAPI = express.Router();
// const { auth } = require('../middleware/auth');
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
// routerAPI.all("*", auth);



router.post('/register', UserController.createUser);

router.post('/login', UserController.loginUser);

// routerAPI.post('/createArticle', upload.single('contentData'), createArticle);

// routerAPI.post('/article/', loadArticle);




export default router;