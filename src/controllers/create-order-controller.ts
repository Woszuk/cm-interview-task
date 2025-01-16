import { NextFunction, Request, Response } from "express";
import { CreateOrderBody } from "src/schemas/order";
import { OrderServices } from "src/services/orders";

export const createOrderController = (orderServices: OrderServices) => {
  return async (req: Request<{}, {}, CreateOrderBody>, res: Response, next: NextFunction) => {
    try {
      const order = await orderServices.createOrder(req.body);

      res.status(201).send(order);
    } catch (err) {
      next(err);
    }
  };
};
