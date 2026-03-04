import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "../../constants";
import { env } from "../../config";

export function optionalAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = req.cookies?.[COOKIE_NAME.ACCESS_TOKEN] as string;

  if (!accessToken) {
    return next();
  }

  try {
    const payload = jwt.verify(accessToken, env.JWT_SECRET) as jwt.JwtPayload;

    req.user = { sub: payload.sub as string };
  } catch {
    // ignore invalid token
  }

  next();
}
