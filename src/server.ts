import express from "express";
import { errorHandler } from "src/middlewares/error-handler";
import { notFoundHandler } from "src/middlewares/not-found-handler";
import { productsRouter } from "src/routes/products";

export const createServer = () => {
  const server = express();
  const router = express.Router();

  server.use(express.json());

  server.use("/products", productsRouter(router));

  server.use(notFoundHandler);

  server.use(errorHandler);

  return server;
};
