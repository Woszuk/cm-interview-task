import { Request, Response, NextFunction } from "express";
import { Schema } from "joi";
import { ValidationError } from "src/errors/ValidationError";

type Location = "body" | "params" | "query";

export const validationMiddleware = ({
  schema,
  location = "body",
}: {
  schema: Schema;
  location?: Location;
}) => {
  return (req: Request, _: Response, next: NextFunction) => {
    const dataToValidate = req[location];
    const { error } = schema.validate(dataToValidate, { abortEarly: false });

    if (error) {
      throw new ValidationError("Validation failed", error);
    }

    next();
  };
};
