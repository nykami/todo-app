import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import userService from '../service/userService';
import { sendSuccessResponse, sendErrorResponse } from '../helpers/response';
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
      const combinedSaltAndHash = `${salt}:${hashedPassword}`;

      const user = await userService.createUser({
        firstName,
        lastName,
        username,
        email,
        password: combinedSaltAndHash,
      });

      const token = jwt.sign(
        {
          userId: user._id.toString(),
        },
        env.jwt_secret!
      );

      return sendSuccessResponse(res, { user, token }, 201);
    } catch (error) {
      return sendErrorResponse(
        res,
        error as Error,
        'An error occurred during registration'
      );
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return sendErrorResponse(res, null, 'Missing required fields');
      }

      const user = await userService.getUserByEmail(email);

      if (!user) {
        return sendErrorResponse(res, null, 'User not found', 409);
      }

      const [storedSalt, storedHash] = user.password.split(':');
      const expectedHash = hashPassword(password, storedSalt);

      if (storedHash !== expectedHash) {
        return res.sendStatus(403);
      }

      const token = jwt.sign({ userId: user._id.toString() }, env.jwt_secret!);

      return sendSuccessResponse(res, { user, token }, 200);
    } catch (error) {
      return sendErrorResponse(
        res,
        error as Error,
        'An error occurred during login'
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
