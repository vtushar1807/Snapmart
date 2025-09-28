const express = require("express");
const routes = express.Router();

const {handleLogout} = require("../controllers/index")

routes.delete("/", handleLogout);

module.exports = routes;