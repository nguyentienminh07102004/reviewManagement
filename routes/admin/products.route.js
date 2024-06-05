const express = require('express');
const multer = require('multer');
const storage = require('../../helpers/storage.js');
const validate = require("../../validates/admin/products.validate.js");

const upload = multer({ storage: storage });

const controller = require('../../controllers/admin/products.controller.js');

const route = express.Router();

route.get("/", controller.index);

// Thay đổi trạng thái 1 sản phẩm
route.patch("/change-status/:id/:status", controller.changeStatus);

// Thay đổi trạng thái nhiều sản phẩm
route.patch("/change-multi-status", controller.changeMultiStatus);

// Xoá 1 sản phẩm(Xoá mềm)
route.delete("/delete/:id", controller.deleteProduct);

// Thùng rác sản phẩm đã xoá
route.get('/garbage', controller.garbageProducts);
route.patch('/garbage/:type/:id', controller.restoreProducts);

// Tạo mới sản phẩm
route.get('/create', controller.createPage);
route.post('/create', upload.single('thumbnail'), validate.productValidate, controller.createProduct);

// Tạo trang edit 1 sản phẩm
route.get("/edit/:id", controller.edit);
route.patch("/edit/:id", upload.single("thumbnail"), validate.productValidate, controller.editProduct);

// Tạo trang chi tiết sản phẩm
route.get("/detail/:id", controller.detail);



module.exports = route;