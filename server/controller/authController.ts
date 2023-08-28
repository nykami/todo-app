import express from 'express';
import bcrypt from 'bcrypt';
import { createUser, getUserByEmail } from '../service/userService';

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

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    if (!firstName || !lastName || !email || !username || !password) {
      return sendErrorResponse(res, null, 'Missing required fields');
    }
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return sendErrorResponse(res, null, 'User already exists');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await createUser({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
    });
    return sendSuccessResponse(res, user, 201);
  } catch (error) {
    console.log(error);
    return sendErrorResponse(
      res,
      error as Error,
      'An error occurred during registration'
    );
  }
};
