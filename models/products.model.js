const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

mongoose.plugin(slug);

const ProductsSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug: { type: String, slug: "title", unique: true },
  deleted: { type: Boolean, default: false },
  deletedAt: Date
}, 
{ timestamps: true });

const Products = mongoose.model("Product", ProductsSchema, "products"); // tham số đầu tiên là tên model

module.exports = Products;