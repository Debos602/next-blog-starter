
import express from 'express';
import { AuthController } from './auth.controller';


const router = express.Router();

router.post('/login', AuthController.loginWithEmailAndPassword);
router.post('/google', AuthController.authWithGoogle);
// router.get('/', PostController.getAllPosts);
// router.get('/:id', PostController.getPostById);
// router.patch('/:id', PostController.updatePost);
// router.delete('/:id', PostController.deletePost);

export const authrouter = router;