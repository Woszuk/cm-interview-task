import { createOrder } from "src/services/orders/create-order";
import { OrderRepository } from "src/services/orders/order-repository";
import { ProductRepository } from "src/services/products/product-repository";

export const createOrderServices = ({
  orderRepository,
  productRepository,
}: {
  orderRepository: OrderRepository;
  productRepository: ProductRepository;
}) => {
  return {
    createOrder: createOrder({ orderRepository, productRepository }),
  };
};

export type OrderServices = ReturnType<typeof createOrderServices>;
