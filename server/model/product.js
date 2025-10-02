const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({

  products:[
    {
      id:{
        type:Number,
      },
      title: {
        type:String,
      },
      description: {
        type:String,
      },
      category: {
        type:String,
      },

      price: {
        type:Number,
      },

      discountPercentage: {
        type:Number,
      },

      rating: {
        type:Number,
      },

      stock: {
        type:String,
      },

      tags: [String],
    
      brand: {
        type:String,
      },

      sku: {
        type:String,
      },

      weight: {
        type:Number,
      },

      dimensions: {
        width: {
            type:Number,
        },
        height: {
            type:Number,
        },
        depth: {
            type:Number,
        }
      },

      warrantyInformation: {
        type:String,
      },
      shippingInformation: {
        type:String,
      },
      availabilityStatus: {
        type:String,
      },
      reviews: [
        {
          rating: {
            type:Number,
          },
          comment: {
            type:String,
          },
          date: {
            type:String,
          },
          reviewerName: {
            type:String,
          },
          reviewerEmail: {
            type:String,
          },
        },
        {
          rating: {
            type:Number,
          },
          comment: {
            type:String,
          },
          date: {
            type:String,
          },
          reviewerName: {
            type:String,
          },
          reviewerEmail: {
            type:String,
          }
        },
        {
          rating: {
            type:Number,
          },
          comment: {
            type:String,
          },
          date: {
            type:String,
          },
          reviewerName: {
            type:String,
          },
          reviewerEmail: {
            type:String,
          }
        }
      ],
      returnPolicy: {
        type:String,
      },
      minimumOrderQuantity: {
        type:String,
      },
      meta: {
        createdAt: {
            type:String,
        },
        updatedAt: {
            type:String,
        },
        barcode: {
            type:String,
        },
        qrCode: {
            type:String,
        }
      },
      images: [String],
      thumbnail: {
        type:String,
      }
    }],

})

const PRODUCT = mongoose.model('product', productSchema);
module.exports = PRODUCT;