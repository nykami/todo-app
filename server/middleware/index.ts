import express from 'express';
import jwt from 'jsonwebtoken';
import { userModel } from '../model/userModel';
import { env } from '../config';
import { sendErrorResponse } from '../helpers/response';
import { merge } from 'lodash';

export async function isAuthenticated(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return sendErrorResponse(res, null, 'Unauthorized', 403);
    }

    const decodedToken = jwt.verify(token, env.jwt_secret!) as {
      userId: string;
    };

    if (!decodedToken) {
      return sendErrorResponse(res, null, `Unauthorized`, 403);
    }

    const user = await userModel.findById(decodedToken.userId);

    if (!user) {
      return sendErrorResponse(res, null, 'Unauthorized', 403);
    }

    merge(req, { currentUser: user });
    return next();
  } catch (error) {
    return sendErrorResponse(res, error as Error, 'Unauthorized');
  }
}
