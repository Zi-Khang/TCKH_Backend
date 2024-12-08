import express, { Router } from "express";
import upload from '../configs/cloudinary'; 
import { UserController, ArticleController } from "../controllers";

// const routerAPI = express.Router();
// const { auth } = require('../middleware/auth');
// const multer = require('multer');
// const upload = multer({ storage: multer.memoryStorage() });

const router = Router();
// routerAPI.all("*", auth);



router.post('/register', UserController.createUser);

router.post('/login', UserController.loginUser);

router.post('/createArticle', upload.single('content'), ArticleController.createArticle);

// routerAPI.post('/article/', loadArticle);




export default router;