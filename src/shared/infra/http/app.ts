import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
// eslint-disable-next-line import/no-extraneous-dependencies
import swaggerUI from "swagger-ui-express";

import createConnection from "@shared/infra/typeorm";

import "../../container";
import upload from "@config/upload";

import AppError from "../../errors/AppError";
import swaggerDoccument from "./swagger.json";

const app = express();

(async () => {
  await createConnection();
  const { router } = await import("./routes");

  app.use(express.json());

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoccument));

  app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
  app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

  app.use(router);

  app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof AppError) {
        return response
          .status(err.statusCode)
          .json({ status: "error", message: err.message });
      }

      return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
      });
    }
  );
})();

export { app };
