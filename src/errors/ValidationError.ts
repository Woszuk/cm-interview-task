import Joi from "joi";

export class ValidationError extends Error {
  details: Joi.ValidationError;

  constructor(message: string, details: Joi.ValidationError) {
    super(message);
    this.name = "ValidationError";
    this.details = details;
  }
}
