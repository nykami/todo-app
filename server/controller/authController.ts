import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userService from '../service/userService';
import { sendSuccessResponse, sendErrorResponse } from './response';

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

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await userService.createUser({
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
  }
}

export default new AuthController();
