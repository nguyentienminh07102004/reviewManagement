const express = require("express");
require('dotenv').config();
const database = require("./config/database.js");
const systemVar = require("./config/system.js");
const methodOverride = require('method-override');
const bodyParse = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const cookie = require('cookie-parser');

const route = require("./routes/client/index.route.js");
const routeAdmin = require("./routes/admin/index.route.js");

const app = express();

// sử dụng method override
app.use(methodOverride('_method'));

// Sử dụng flash
app.use(cookie("keyboard cat"));
app.use(session( { cookie: { maxAge: 6000 } }));
app.use(flash());

// sử dụng body-parser
app.use(bodyParse.urlencoded({ extended: false }));

const port = process.env.PORT;

app.set("views", `${__dirname}/views`);
app.set("view engine", "pug");

database.connect();

app.use(express.static(`${__dirname}/public`));

routeAdmin.route(app); // nếu exports không có ngoặc nhọn thì có thể sử dụng hàm đó trực tiếp luôn còn nếu sử dụng ngoặc nhọn thì phải gọi hàm đó ra để dùng
route(app);

// App location variable
app.locals.PATH_ADMIN = systemVar.PATH_ADMIN;

app.listen(port, () => {
  console.log(`App open in port ${port}`);
});