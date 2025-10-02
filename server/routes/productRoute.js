const express = require("express");
const routes = express.Router();
const {handleProduct} = require("../controllers/index")

routes.get('/category/:cat', handleProduct);
// routes.get("/:id");


module.exports = routes;