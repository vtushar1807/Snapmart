const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    username:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        unique:true,
    },

    password:{
        type:String,
        required:true,
    },

    cartHistory:[
        item={
            id:{
                type:Number,
            },
            name:{
                type:String,
            },
            price:{
                type:Number,
            },
            discountPercent:{
                type:Number,
            },
            availabilityStatus:{
                type:String,
            },
            quantity:{
                type:Number,
            }
        }
    ]

})

const USER = mongoose.model('user', userSchema);

module.exports = USER;