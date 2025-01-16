import Joi from "joi";

export const createOrderSchema = Joi.object({
  customerId: Joi.string().required(),
  products: Joi.array()
    .items(
      Joi.object({
        productId: Joi.string().hex().length(24).required(),
        quantity: Joi.number().positive().integer().required(),
      })
    )
    .required(),
});

export type CreateOrderBody = {
  customerId: string;
  products: { productId: string; quantity: number }[];
};
