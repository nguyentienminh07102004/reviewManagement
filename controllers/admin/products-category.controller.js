//[GET] /admin/products-category
const index = async (req, res) => {
  res.render("admin/pages/products-category/index.pug", {
    title: "Products Category"
  });
}

module.exports = { index };