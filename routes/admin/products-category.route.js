const route = require("express").Router();
const controller = require("../../controllers/admin/products-category.controller.js");

route.get("/", controller.index);

module.exports = route;