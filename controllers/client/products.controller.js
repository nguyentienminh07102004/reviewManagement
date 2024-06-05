const Products = require("../../models/products.model.js");

// [GET] /products
const index = async (req, resp) => {
  const products = await Products.find({
    status: "active",
    deleted: false
  });

  resp.render("client/pages/products/index.pug", {
    title: "Products Page",
    product: products
  });
};

// [GET] /products/slug
const detailProduct = async (req, res) => {
  const slug = req.params.slug;
  try{
    const find = {
      deleted: false,
      status: "active",
      slug: slug
    };

    const product = await Products.findOne(find);

    res.render("client/pages/products/detail.pug", {
      product: product,
      title: product.title
    })
  } catch(error){
    req.flash("error", "Product not exists");
    res.redirect(`/products`);
  }
};
module.exports = { index, detailProduct };