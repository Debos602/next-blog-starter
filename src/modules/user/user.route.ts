import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// Correct usage
router.get('/', UserController.getAllUser);
router.post('/', UserController.createUser);

export default router;
