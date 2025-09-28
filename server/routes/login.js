const express = require("express");
const routes = express.Router();

const {handleValidateLogin} = require("../controllers/index")

routes.post("/", handleValidateLogin);

module.exports = routes;