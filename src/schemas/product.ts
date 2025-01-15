import Joi from "joi";

export const createProductSchema = Joi.object({
  name: Joi.string().required().min(3).max(50),
  description: Joi.string().min(3).max(50).required(),
  price: Joi.number().precision(2).positive().required(),
  stock: Joi.number().integer().positive().required(),
});

export type CreateProductBody = {
  name: string;
  description: string;
  price: number;
  stock: number;
};

export const restockProductSchema = Joi.object({
  id: Joi.string().hex().length(24),
});

export type RestockProductParams = {
  id: string;
};
