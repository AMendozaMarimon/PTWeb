import mongoose from "mongoose";

const Products = mongoose.model("products", new mongoose.Schema({}));

export default Products;