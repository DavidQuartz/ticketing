import { ValidationError, FieldValidationError } from 'express-validator';
import { CustomError } from './custom-error';

// A type guard to check for the presence of the `path` property in Error
function hasPathProperty(
  error: ValidationError
): error is FieldValidationError {
  return (error as FieldValidationError).path !== undefined;
}

export class RequestValidationError extends CustomError {
  statusCode = 400;
  constructor(public errors: ValidationError[]) {
    super('Invalid request parameters');

    // Only because we are extending a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors() {
    return this.errors.map((err) => ({
      message: err.msg,
      ...(hasPathProperty(err) && { field: err.path }),
    }));
  }
}
