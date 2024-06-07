const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const productsCategorySchema = new mongoose.Schema({
  title: String,
  description: String
});