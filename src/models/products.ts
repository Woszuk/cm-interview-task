import mongoose, { Schema, Document } from "mongoose";

export interface Product extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
}

const productSchema: Schema = new Schema<Product>({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
});

const ProductModel = mongoose.model<Product>("Products", productSchema);

export default ProductModel;
