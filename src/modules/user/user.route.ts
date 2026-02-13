import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

// Correct usage
router.get('/', UserController.getAllUser);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
