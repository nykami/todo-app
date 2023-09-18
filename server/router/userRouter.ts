import { Router } from 'express';
import userController from '../controller/userController';
import todoRouter from './todoRouter';
import { isAuthenticated } from '../middleware';

const router = Router();

router.get('/', isAuthenticated, userController.getUser);
router.use('/todos', isAuthenticated, todoRouter);

export default router;
