import { NextFunction, Request, Response } from "express";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

// Global Error Handler
export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response => {
  if (error instanceof RequestValidationError) {
    return res
      .status(error.statusCode)
      .json({ errors: error.serializeErrors() });
  }

  if (error instanceof DatabaseConnectionError) {
    return res
      .status(error.statusCode)
      .json({ errors: error.serializeErrors() });
  }

  return res.status(500).send({
    errors: [{ message: error.message }],
  });
};
