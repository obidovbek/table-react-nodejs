import {Router} from 'express';
import { postService } from './components/postService.js';

const router = Router();

router.get('/posts', postService.bind(this));

export default router;