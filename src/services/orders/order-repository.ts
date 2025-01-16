import { Order } from "src/models/order";

export type OrderRepository = {
  create(data: Order): Promise<Order>;
};
