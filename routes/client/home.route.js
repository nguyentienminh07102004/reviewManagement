const express = require("express");
const controller = require("../../controllers/client/home.controller.js");

const route = express.Router(); // sử dụng route có sẵn của express để code không phải truyền các tham số app sang

route.get("/", controller.index);

module.exports = route;