const mongoose = require("mongoose");

async function connectMongodb(url){
    await mongoose.connect(url);
}

module.exports = {
    connectMongodb,
}