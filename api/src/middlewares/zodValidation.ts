import { Schema } from "zod";
import { NextFunction, Response, Request } from "express";

type Source = "body" | "params" | "query";
export const zodValidation =
  (schema: Schema, source: Source = "body") =>
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req[source];
    await schema.parseAsync(data);
    next();
  };
