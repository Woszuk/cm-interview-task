import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ValidationError } from "src/errors/ValidationError";

export const validationMiddleware = (schema: Schema) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      throw new ValidationError("Validation failed", error);
    }

    next();
  };
};
