const express = require("express");
const controller = require("../../controllers/admin/dashboard.controller.js");

const route = express.Router();


route.get("/", controller.dashboard);

module.exports = route;