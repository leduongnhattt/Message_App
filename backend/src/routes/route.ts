import express from 'express'
import AuthController from '../controllers/AuthController';


const router = express.Router();
router.post('/auth/login', AuthController.login)

export default router;
