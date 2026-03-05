import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import { routes } from "./routes";
import { globalErrorHandler } from "./common/errors";

export const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: "Not Found",
    timestamp: new Date().toISOString(),
    path: req.originalUrl,
  });
});
app.use(globalErrorHandler);
