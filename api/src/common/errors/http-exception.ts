/**
 * Base HTTP exception class.
 * All custom exceptions should extend this class.
 */
export class HttpException extends Error {
  public readonly statusCode: number;
  public readonly error: string;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode: number,
    error: string,
    details?: unknown,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }
}
