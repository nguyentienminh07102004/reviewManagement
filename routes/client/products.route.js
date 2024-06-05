const express = require("express");
const controller = require("../../controllers/client/products.controller.js");

const route = express.Router();

route.get("/", controller.index);

// detail products
route.get("/:slug", controller.detailProduct);

module.exports = route;