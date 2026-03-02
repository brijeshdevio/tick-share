import { env } from "@/config";
import { COOKIE_NAME } from "@/constants";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedException } from "../errors";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const accessToken = req.cookies?.[COOKIE_NAME.ACCESS_TOKEN] as string;
  if (!accessToken) throw new UnauthorizedException();

  try {
    const payload = jwt.verify(accessToken, env.JWT_SECRET);
    req.user = { sub: payload.sub as string };
  } catch {
    throw new UnauthorizedException();
  }
  next();
}
