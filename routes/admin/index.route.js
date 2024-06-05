const dashboardRoute = require("./dashboard.route.js");
const productsRoute = require("./products.route.js");
const systemVar = require("../../config/system.js");

const route = (app) => {
  app.use(systemVar.PATH_ADMIN + "/dashboard", dashboardRoute);
  app.use(systemVar.PATH_ADMIN + "/products", productsRoute); 
}

module.exports = {route};