const homeRoute = require("./home.route.js");
const productsRoute = require("./products.route.js");
module.exports = (app) => {
  app.use("/", homeRoute);

  app.use("/products", productsRoute);
}