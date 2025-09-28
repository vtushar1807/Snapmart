const express = require("express");
const app = express();

const {handleCreateNewUser} = require("../controllers/index");

const routes = express.Router();

routes.post("/", handleCreateNewUser);

module.exports = routes;