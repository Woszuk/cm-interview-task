import { Request } from "express";
import { NotFoundError } from "src/errors/NotFoundError";

export const notFoundHandler = (req: Request): void => {
  throw new NotFoundError(`Route not found: ${req.originalUrl}`);
};
