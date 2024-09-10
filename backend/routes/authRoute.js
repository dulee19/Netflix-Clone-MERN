import express from 'express';
import { login, logout, signUp, authCheck } from '../controllers/authController.js';
import { protectRoute } from '../middleware/protectRoute.js'

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout)

router.get('/authCheck', protectRoute, authCheck);

export default router;