import type { Request, Response, NextFunction } from "express";
import { HttpException } from "./httpException";
import { ZodError, type ZodIssue } from "zod";

const formatZodError = (issues: ZodIssue[]) => {
  return issues.map((issue) => {
    return {
      field: issue.path[0],
      message: issue.message,
    };
  });
};

/**
 * Global error handling middleware.
 * Should be registered after all routes.
 */
export function globalErrorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Validation Error",
      details: formatZodError(err.issues),
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
  }

  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
      details: err.details ?? null,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
    });
  }

  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Something went wrong",
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
}
