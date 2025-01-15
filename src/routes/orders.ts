import { Router } from "express";
import { createOrderController } from "src/controllers/create-order-controller";
import { createOrderRepository } from "src/database/repositories/order-repository";
import { createProductRepository } from "src/database/repositories/product-repository";
import { validationMiddleware } from "src/middlewares/validation-middleware";
import { createOrderSchema } from "src/schemas/order";
import { createOrderServices } from "src/services/orders";

export const ordersRouter = (router: Router) => {
  const orderRepository = createOrderRepository();
  const productRepository = createProductRepository();
  const orderServices = createOrderServices({ orderRepository, productRepository });

  router.post(
    "/orders",
    validationMiddleware({ schema: createOrderSchema }),
    createOrderController(orderServices)
  );

  return router;
};
