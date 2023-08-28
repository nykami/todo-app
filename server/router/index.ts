import express from 'express';
import todoRouter from './todoRouter';
import userRouter from './userRouter';
import authRouter from './authRouter';

const router = express.Router();

export default (): express.Router => {
  todoRouter(router);
  userRouter(router);
  authRouter(router);
  return router;
};
