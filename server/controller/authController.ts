import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../service/userService';
import { sendSuccessResponse, sendErrorResponse } from './response';
import { env } from '../config';
import crypto from 'crypto';

class AuthController {
  async register(req: Request, res: Response) {
    try {
      const { firstName, lastName, username, email, password } = req.body;
      
      if (!firstName || !lastName || !email || !username || !password) {
        return sendErrorResponse(res, null, 'Missing required fields');
      }
      const existingUser = await userService.getUserByEmail(email);

      if (existingUser) {
        return sendErrorResponse(res, null, 'User already exists');
      }

      const salt = generateRandomSalt();

      const hashedPassword = hashPassword(password, salt);

      const user = await userService.createUser({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
      });

      const token = jwt.sign(
        {
          userId: user._id.toString(),
        },
        env.jwt_secret!
      );

      return sendSuccessResponse(res, { user, token }, 201);
    } catch (error) {
      console.log(error);
      return sendErrorResponse(
        res,
        error as Error,
        'An error occurred during registration'
      );
    }
  }
}

function generateRandomSalt() {
  return crypto.randomBytes(16).toString('hex');
}

function hashPassword(password: string, salt: string) {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

export default new AuthController();
