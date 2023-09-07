import { Router } from 'express';
import todoRouter from './todoRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);

export default router;
