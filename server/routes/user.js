const expressv = require("express");
const routes = expressv.Router();

const {handleHomepage} = require("../controllers/index")


routes.get("/", handleHomepage);

module.exports = routes;