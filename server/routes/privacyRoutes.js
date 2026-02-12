import express from 'express';
import { exportUserData, deleteAccount } from '../controllers/privacyController.js';
import { protect } from '../controllers/authController.js';

const router = express.Router();

router.use(protect); // All privacy routes require login

router.get('/export', exportUserData);
router.delete('/delete', deleteAccount);

export default router;
