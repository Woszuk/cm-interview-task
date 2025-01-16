import test, { describe, mock } from "node:test";
import assert from "node:assert";
import { createProductRepository } from "src/database/repositories/product-repository";
import { createOrderRepository } from "src/database/repositories/order-repository";
import { createOrderServices } from "src/services/orders";
import { EntityNotFoundError } from "src/errors/EntityNotFoundError";
import { StockInsufficientError } from "src/errors/StockInsufficientError";

describe("createOrder", () => {
  const productRepository = createProductRepository();
  const orderRepository = createOrderRepository();
  const orderService = createOrderServices({ orderRepository, productRepository });

  test("Should create order", async () => {
    const mockFindMany = mock.method(productRepository, "findMany", () => [spoon, fork]);

    const mockSell = mock.method(productRepository, "sell", async (id: string) => {
      if (id === spoon._id) {
        return { ...spoon, stock: spoon.stock - 1 };
      }

      return { ...fork, stock: fork.stock - 1 };
    });

    const createOrder = mock.method(orderRepository, "create", async () => ({
      customerId: "1",
      products: [
        {
          productId: "1",
          quantity: 1,
          _id: "1",
        },
        {
          productId: "2",
          quantity: 1,
          _id: "2",
        },
      ],
      _id: "1",
    }));

    const order = await orderService.createOrder({
      customerId: "1",
      products: [
        { productId: "1", quantity: 1 },
        { productId: "2", quantity: 1 },
      ],
    });

    assert.strictEqual(mockFindMany.mock.calls.length, 1);
    assert.strictEqual(mockSell.mock.calls.length, 2);
    assert.strictEqual(createOrder.mock.calls.length, 1);
    assert.strictEqual(order.products.length, 2);
  });

  test("Should throw when at least one of product not exist", async () => {
    const mockFindMany = mock.method(productRepository, "findMany", () => [spoon]);

    await assert.rejects(
      async () => {
        await orderService.createOrder({
          customerId: "1",
          products: [
            { productId: "1", quantity: 1 },
            { productId: "2", quantity: 1 },
          ],
        });
      },
      err => {
        assert.strictEqual(mockFindMany.mock.calls.length, 1);
        assert.strictEqual(err instanceof EntityNotFoundError, true);
        return true;
      }
    );
  });

  test("Should throw when quantity of product is greater then stock", async () => {
    const mockFindMany = mock.method(productRepository, "findMany", () => [spoon]);

    await assert.rejects(
      async () => {
        await orderService.createOrder({
          customerId: "1",
          products: [{ productId: "1", quantity: 10 }],
        });
      },
      err => {
        assert.strictEqual(mockFindMany.mock.calls.length, 1);
        assert.strictEqual(err instanceof StockInsufficientError, true);
        return true;
      }
    );
  });
});

const spoon = {
  _id: "1",
  name: "Spoon",
  description: "The best spoon in the world at an attractive price",
  price: 1.23,
  stock: 2,
};

const fork = {
  _id: "2",
  name: "Fork",
  description: "The best fork in the world at an attractive price",
  price: 3.21,
  stock: 3,
};
