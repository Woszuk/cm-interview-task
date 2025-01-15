import express from "express";
import { errorHandler } from "src/middlewares/error-handler";
import { notFoundHandler } from "src/middlewares/not-found-handler";
import { ordersRouter } from "src/routes/orders";
import { productsRouter } from "src/routes/products";

export const createServer = () => {
  const server = express();
  const router = express.Router();

  server.use(express.json());

  server.use(ordersRouter(router));
  server.use(productsRouter(router));

  server.use(notFoundHandler);

  server.use(errorHandler);

  return server;
};
