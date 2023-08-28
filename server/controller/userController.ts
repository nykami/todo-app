import express from 'express';
import { getUserById } from '../service/userService';

const sendSuccessResponse = <T>(
  res: express.Response,
  data: T,
  statusCode: number = 200
) => {
  res.status(statusCode).json(data);
};

const sendErrorResponse = (
  res: express.Response,
  error: Error | null,
  message: string,
  statusCode: number = 400
) => {
  if (error) {
    console.error(error);
  }
  res.status(statusCode).json({ error: message });
};

export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const userId = req.params.userId;
    const user = await getUserById(userId);

    return sendSuccessResponse(res, user);
  } catch (error) {
    sendErrorResponse(
      res,
      error as Error,
      `An error occurred fetching the user.`
    );
  }
};
