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

router.post('/sendReview', upload.single('contentReview'), ArticleController.updateArticleReview);

// router.post(
//     '/updateArticle',
//     upload.fields([
//       { name: 'image', maxCount: 1 }, 
//       { name: 'content', maxCount: 1 },
//     ]),
//     ArticleController.updateImageAndContentArticlePublic
//   );
  



export default router;