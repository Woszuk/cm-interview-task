import OrderModel, { Order } from "src/models/order";
import { OrderRepository } from "src/services/orders/order-repository";

export const createOrderRepository = (): OrderRepository => {
  const create = async (data: Order) => OrderModel.create(data);

  return { create };
};
