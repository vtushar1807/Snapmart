const mongoose = require("mongoose");

const subsSchema = new mongoose.Schema({
    subscribedEmail:{
            type:String
        }
})

const SUBS = mongoose.model('sub', subsSchema);

module.exports=SUBS;