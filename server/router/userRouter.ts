import { Router } from 'express';
import userController from '../controller/userController';
import todoRouter from './todoRouter';

const router = Router();

router.get('/:userId', userController.getUser);
router.use('/todos', todoRouter);

export default router;
