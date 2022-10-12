import { Request, Response, NextFunction } from "express";
import { logger } from "../middleware/logger";
import { ErrorCode } from "./error-code";
import { ErrorException } from "./error-exception";
import { ErrorModel } from "./error-model";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.info("Error handling middleware called.");
  logger.info("Path:", req.path);
  logger.error("Error occured:", err);
  if (err instanceof ErrorException) {
    logger.error("Error is known.");
    res.status(err.status).send(err);
  } else {
    res
      .status(500)
      .send({ code: ErrorCode.UnknownError, status: 500 } as ErrorModel);
  }
};
