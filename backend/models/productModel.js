const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please Enter a Product Name"],
        trim : true,
        maxLength : [150, "Product name cannot exceed 150 characters"]
    },
    price : {
        type : Number,
        required : true,
     // default : 0.00,
    },
    description : {
        type : String,
        required : [true, "Please Enter a Description"]
    },
    ratings : {
        type : String,
        default : 0
    },
    images : [
        {
           image : {
                type : String,
                required : true
           }
        }
    ],
    category : {
        type : String,
        required : [true, "Please Enter a Product category"],
        enum : {
            values : [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Food',
                'Books',
                'Clothes/Shoes',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message : "Please select correct Category"
        }
    },
    seller : {
        type : String,
        required : [true, "Please Enter a Product Seller"]
    },
    stock : {
        type : Number,
        required : [true, "Please Enter a Product Stock Value"],
        maxLength : [50, "Product Stock cannot exceed 50"]
    },
    numOfReviews : {
        type : Number,
        default : 0
    },
    reviews : [
        {
            user : {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User'
            },
            rating : {
                type : String,
                required : true
            },
            comment : {
                type : String,
                required : true
            }
        }
    ],
    user : {
        type : mongoose.Schema.Types.ObjectId
    },
    createdAt : {
        type : Date,
        default : Date.now()
    }
})

let schema = mongoose.model('Product',productSchema);

module.exports = schema;