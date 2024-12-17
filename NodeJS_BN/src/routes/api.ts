import express, { Router } from "express";
import upload from '../configs/cloudinary'; 
import { UserController, ArticleController, ReviewAssignments } from "../controllers";
import VolumeController from "../controllers/VolumeController";
import JournalIssues from "../controllers/JournalIssues";

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

router.post(
    '/updateArticle',
    upload.fields([
      { name: 'image', maxCount: 1 }, 
      { name: 'contentPublic', maxCount: 1 },
    ]),
    ArticleController.updateImageAndContentArticlePublic
  );
  
  router.post('/createVolume', VolumeController.createVolume);

  router.get('/getVolumeList', VolumeController.getVolumeList);

  router.post('/createIssue', JournalIssues.createJournalIssue);

  router.post('/getIssueList', JournalIssues.getIssuesByVolume);
  
  router.post('/addArticle', JournalIssues.assignArticleToIssue);

  router.post('/decideArticle', ArticleController.decideArticle);
  
  router.post('/updateArticleFromAuthor', upload.single('content'), ArticleController.updateArticleFromAuthor);

export default router;