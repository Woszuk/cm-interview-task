import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import { EntityNotFoundError } from "src/errors/EntityNotFoundError";
import { NotFoundError } from "src/errors/NotFoundError";
import { ValidationError } from "src/errors/ValidationError";

const mapJoiError = (error: Joi.ValidationError) => {
  return error.details.map(err => {
    return { path: err.path[0], message: err.message.split(" ").slice(1).join(" ") };
  });
};

export const errorHandler = (err: Error, _1: Request, res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    res.status(400).send({
      message: err.message,
      details: mapJoiError(err.details),
    });
  } else if (err instanceof EntityNotFoundError) {
    res.status(404).send({
      message: err.message,
    });
  } else if (err instanceof NotFoundError) {
    res.status(404).send({
      status: "Not Found error",
      message: err.message,
    });
  } else {
    res.status(500).send("Internal server error");
  }
  next();
};
