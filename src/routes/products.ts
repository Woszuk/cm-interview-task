import { Router } from "express";
import { createProductController } from "src/controllers/create-product";
import { getProductsController } from "src/controllers/get-products";
import { restockProductController } from "src/controllers/restock-product-controller";
import { sellProductController } from "src/controllers/sellProductController";
import { createProductRepository } from "src/database/repositories/product-repository";
import { validationMiddleware } from "src/middlewares/validation-middleware";
import {
  createProductSchema,
  restockProductSchemaBody,
  restockProductSchemaParams,
  sellProductSchemaBody,
  sellProductSchemaParams,
} from "src/schemas/product";
import { createProductServices } from "src/services/products";

export const productsRouter = (router: Router) => {
  const productRepository = createProductRepository();
  const productServices = createProductServices(productRepository);

  router.get("/products", getProductsController(productServices));

  router.post(
    "/products",
    validationMiddleware({ schema: createProductSchema }),
    createProductController(productServices)
  );

  router.post(
    "/products/:id/restock",
    validationMiddleware({ schema: restockProductSchemaBody }),
    validationMiddleware({ schema: restockProductSchemaParams, location: "params" }),
    restockProductController(productServices)
  );

  router.post(
    "/products/:id/sell",
    validationMiddleware({ schema: sellProductSchemaBody }),
    validationMiddleware({ schema: sellProductSchemaParams, location: "params" }),
    sellProductController(productServices)
  );
  return router;
};
