const express = require("express");
const routes = express.Router();
const {handleProduct, handleProductDetail, handleCartItems} = require("../controllers/index")

routes.get('/category/:cat', handleProduct);
routes.get('/detail/:id', handleProductDetail);
routes.get('/cart', handleCartItems);
// routes.get("/:id");


module.exports = routes;