import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

// Global Error Handler
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof CustomError) {
    return res
      .status(error.statusCode)
      .json({ errors: error.serializeErrors() });
  }

  return res.status(500).send({
    errors: [{ message: error.message }],
  });
};
