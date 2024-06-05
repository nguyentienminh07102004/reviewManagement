const productValidate = (req, res, next) => {
  if(!req.body.title){
    req.flash("error", "Please enter title");
    res.redirect("back");
    return;
  }
  if(req.body.price){
    let price = req.body.price;
    let Price = parseFloat(price);
    if(isNaN(price)){
      req.flash("error", "Price is a number");
      res.redirect("back");
      return;
    } else if (Price <= 0){
      req.flash("error", "Price is a number > 0");
      res.redirect("back");
      return;
    }  
  }
  if(req.body.discountPercentage){
    let discountPercentage = req.body.discountPercentage;
    let discount = parseFloat(discountPercentage);
    if(isNaN(discount)){
      req.flash("error", "Discount Percentage is a number");
      res.redirect("back");
      return;
    } else if (discount <= 0){
      req.flash("error", "Discount Percentage is a number > 0");
      res.redirect("back");
      return;
    }  
  }
  if(req.body.stock){
    console.log(req.body.stock);
    let stock = req.body.stock;
    let stockNumber = parseFloat(stock);
    if(isNaN(stockNumber)){
      req.flash("error", "Stock must be a number");
      res.redirect("back");
      return;
    } else if(stockNumber <= 0) {
      req.flash("error", "stock must be a number greater than 0");
      res.redirect("back");
      return;
    }
  }
  next();
}

module.exports = { productValidate };