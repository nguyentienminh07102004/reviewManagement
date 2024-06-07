const Products = require("../../models/products.model.js");
const filterStatus = require("../../helpers/filterStatus.js");
const search = require("../../helpers/search.js");
const pagination = require("../../helpers/pagination.js");

// [GET] /admin/products/
const index = async (req, res) => {
  
  let find = {
    deleted: false
  };
  if(req.query.status){
    find.status = req.query.status;
  }

  // filterStatus
  const buttons = filterStatus(req.query);

  // Seacrch
  const keyword = search(req.query);
  if(keyword.regex){
    find['title'] = keyword.regex;
  }

  // Pagination
  let page = {
    currentPage: 1,
    limitItem: 3
  }

  // sort
  let sort = {};
  if(req.query.sortKey){
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "asc";
  }
  // Mặc định có id giảm dần
  sort._id = "desc";
  // end sort
  
  const countProducts = await Products.countDocuments(find);
  pagination(page, req.query, countProducts);

  // find Products
  let products = await Products.find(find).sort( sort ).limit(page.limitItem).skip(page.skip);

  res.render("admin/pages/products/index.pug", {
    title: "Products",
    products: products,
    buttons: buttons,
    keyword: keyword.keyword,
    pagination: page
  });
}

// [PATCH] /admin/products/:id/:status
const changeStatus = async (req, res) => {
  await Products.updateOne({ _id: req.params.id }, { status: req.params.status });
  req.flash('success', 'Change status successfully!');
  res.redirect('back');
}

//[PATCH] /admin/products/change-multi-status
const changeMultiStatus = async (req, res) => {
  // Trước khi update cần convert sang mảng
  const ids = req.body.ids.split(", ");
  const type = req.body.type;
  switch(type){
    case "active":
    case "inactive":
      console.log(type);
      await Products.updateMany({ _id: ids }, { status: type });
      break;
    case 'delete-multi':
      await Products.updateMany({ _id: ids }, { deleted: true, deletedAt: new Date() });
      break;
    case 'restore-multi':
      await Products.updateMany({ _id: ids }, { deleted: false });
      break;
    case 'delete-permaently':
      await Products.deleteMany({ _id: ids });
      break;
    case 'change-position':
      ids.forEach( async ID =>  {
        const [id, position] = ID.split("-");
        await Products.updateOne({ _id: id }, { position: position });
      });
      break;
  }
  
  res.redirect('back');
}

// [DELETE] /admin/products/delete/:id
const deleteProduct = async (req, res) => {
  const id = req.params.id;
  await Products.updateOne( { _id: id }, { deleted: true, deletedAt: new Date() });
  res.redirect('back');
}

//[GET] /admin/products/garbage
const garbageProducts = async (req, res) => {
  // find là lọc ra các sản phẩm 
  let find = { 
    deleted: true
  }
  let page = {
    limitItem: 3,
    currentPage: 1
  }
  const keyword = search(req.query);

  if(keyword.regex){
    find['title'] = keyword.regex;
  }

  const countproducts = await Products.countDocuments(find);

  pagination(page, req.query, countproducts);

  const products = await Products.find(find).limit(page.limitItem).skip(page.skip);
  
  res.render('admin/pages/products/garbage.pug', {
    title: "Gabage products",
    keyword: keyword.keyword,
    products: products,
    pagination: page
  });
}

// [PATCH] /admin/products/garbage/:type/:id
const restoreProducts = async (req, res) => {
  const id = req.params.id;
  const type = req.params.type;
  if(type === 'restore')
    await Products.updateOne({ _id: id }, { deleted: false });
  else
    await Products.deleteOne({ _id: id });
  res.redirect('back');
}

// [GET] /admin/products/create
const createPage = (req, res) => {
  res.render("admin/pages/products/create.pug", { title: "Create a product" });
}

// [POST] /admin/products/create
const createProduct = async (req, res) => {
  if(req.body.price) req.body.price = parseFloat(req.body.price);
  if(req.body.stock) req.body.stock = parseFloat(req.body.stock);
  if(req.body.discountPercentage) req.body.discountPercentage = parseFloat(req.body.discountPercentage);
  if(req.body.position == ''){
    const countProducts = await Products.countDocuments();
    req.body.position = countProducts + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  const product = new Products(req.body);
  await product.save();

  res.redirect('back');
}

// [GET] /admin/products/edit/:id
const edit = async (req, res) => {
  const id = req.params.id;

  let product = await Products.findOne({ deleted: false, _id: id });
  
  res.render("admin/pages/products/edit.pug", {
    title: "Edit Products",
    product: product
  });
}

// [PATCH] /admin/products/:id
const editProduct = async (req, res) => {
  try{
    if(req.body.price) req.body.price = parseFloat(req.body.price);
    if(req.body.position) req.body.position = parseInt(req.body.position);
    if(req.body.discountPercentage) req.body.discountPercentage = parseFloat(req.body.discountPercentage);
    if(req.body.stock) req.body.stock = parseInt(req.body.stock);

    if(req.file){
      req.body.thumbnail = `/admin/uploads/${req.file.filename}`;
    }

    await Products.updateOne({ _id: req.params.id }, req.body );

    req.flash("success", "Update product successfully!");
    res.redirect("back");
  } catch(error){
    req.flash("error", "Update product failed");
    res.redirect("back");
  }
}

// [GET] /admin/products/detail/:id
const detail = async (req, res) => {
  const id = req.params.id;
  const product = await Products.findOne({ _id: id });

  res.render("admin/pages/products/detail.pug", {
    title: "Detail product",
    product: product
  })
}

module.exports = { index, changeStatus, changeMultiStatus, deleteProduct, garbageProducts, 
                    restoreProducts, createPage, createProduct, edit, editProduct, detail };