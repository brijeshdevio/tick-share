import express from "express";
import cookieParser from "cookie-parser";
import { routes } from "./routes";
import { globalErrorHandler } from "./common";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (_, res) => {
  res.send("Welcome to Blip API!");
});

app.get("/health", (_, res) => {
  res.send("OK");
});

app.use("/api", routes);

app.use(globalErrorHandler);
