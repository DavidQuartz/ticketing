// Not using an interface so that we can use 'instance' of

export abstract class CustomError extends Error {
  abstract statusCode: number;

  constructor(message: string) {
    // pass a message only for logging purposes
    super(message);

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): {
    message: string;
    field?: string;
  }[];
}
