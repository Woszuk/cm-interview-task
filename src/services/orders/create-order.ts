import { EntityNotFoundError } from "src/errors/EntityNotFoundError";
import { StockInsufficientError } from "src/errors/StockInsufficientError";
import { Order } from "src/models/order";
import { OrderRepository } from "src/services/orders/order-repository";
import { ProductRepository } from "src/services/products/product-repository";

export const createOrder = ({
  orderRepository,
  productRepository,
}: {
  orderRepository: OrderRepository;
  productRepository: ProductRepository;
}) => {
  return async ({ customerId, products }: Order) => {
    const productsIds = products.map(p => p.productId);

    const productsByIds = await productRepository.findMany(productsIds);

    if (productsByIds.length !== products.length) {
      const ids = productsByIds.map(p => p._id.toString());

      throw new EntityNotFoundError("One or more products do not exist", {
        ids: productsIds.filter(id => !ids.includes(id)),
      });
    }

    for (const item of products) {
      const product = productsByIds.find(p => p._id.toString() === item.productId);

      if (product) {
        if (item.quantity > product.stock) {
          throw new StockInsufficientError(`Insufficient stock for product ${product.name}`, {
            stock: product.stock,
            quantity: item.quantity,
            id: product._id,
          });
        }

        await productRepository.sell({ id: product._id, quantity: item.quantity });
      }
    }

    const order = await orderRepository.create({ customerId, products });

    return order;
  };
};
