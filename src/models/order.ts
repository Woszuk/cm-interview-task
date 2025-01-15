import mongoose, { Schema, Document } from "mongoose";

export interface Order {
  customerId: string;
  products: { productId: string; quantity: number }[];
}

const orderSchema: Schema = new Schema<Order>({
  customerId: {
    // Should be ref to 'Customer', but for now we don't have Customer collection
    type: String,
    required: true,
  },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Product" },
      quantity: { type: Number, required: true },
    },
  ],
});

const OrderModel = mongoose.model<Order & Document>("Order", orderSchema);

export default OrderModel;
