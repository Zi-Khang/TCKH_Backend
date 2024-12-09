import express, { Router } from "express";
import upload from '../configs/cloudinary'; 
import { UserController, ArticleController, ReviewAssignments } from "../controllers";

const router = Router();




router.post('/register', UserController.createUser);

router.post('/login', UserController.loginUser);

router.post('/createArticle', upload.single('content'), ArticleController.createArticle);

router.get('/getArticle', ArticleController.getListArticles);

router.post('/getListReviewersAvailable', ReviewAssignments.getReviewerList);

router.post('/assignReviewer', ReviewAssignments.assignReviewer);

router.post('/viewAssignmentList', ReviewAssignments.viewAssignmentList); 

router.post('/chooseAssignment', ReviewAssignments.chooseAssignments); 

router.get('/getMyArticle', ArticleController.getMyArticle);



export default router;