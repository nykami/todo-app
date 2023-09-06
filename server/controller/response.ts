import { Response } from 'express';

export function sendSuccessResponse<T>(
  res: Response,
  data: T,
  statusCode: number = 200
) {
  res.status(statusCode).json(data);
}

export function sendErrorResponse(
  res: Response,
  error: Error | null,
  message: string,
  statusCode: number = 400
) {
  if (error) {
    console.error(error);
  }
  res.status(statusCode).json({ error: message });
}
