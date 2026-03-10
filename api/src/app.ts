import express, { type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import { globalErrorHandler } from "./common";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_: Request, res: Response) => {
  res.send("Welcome to Blip API!");
});

app.get("/health", (_: Request, res: Response) => {
  res.send("OK");
});

app.use("/api", routes);

app.use(globalErrorHandler);

export default app;
