import { Request, Response } from 'express';
import userService from '../service/userService';
import { sendSuccessResponse, sendErrorResponse } from './response';

class UserController {
  async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;

      if (!userId) {
        throw new Error('userId was not provided');
      }

      const user = await userService.getUserById(userId);

      return sendSuccessResponse(res, user);
    } catch (error) {
      sendErrorResponse(
        res,
        error as Error,
        `An error occurred fetching the user.`
      );
    }
  }
}

export default new UserController();
