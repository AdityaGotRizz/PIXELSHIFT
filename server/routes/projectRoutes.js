import express from 'express';
import { protect } from '../controllers/authController.js';
import {
    getAllProjects,
    createProject,
    getProject,
    updateProject,
    deleteProject
} from '../controllers/projectController.js';

const router = express.Router();

// Protect all routes after this middleware
router.use(protect);

router
    .route('/')
    .get(getAllProjects)
    .post(createProject);

router
    .route('/:id')
    .get(getProject)
    .patch(updateProject)
    .delete(deleteProject);

export default router;
