import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  nombre: String,
  precio_base: Number,
  existencia: Number,
});

const Products = mongoose.model("Product", productSchema);

export default Products;
