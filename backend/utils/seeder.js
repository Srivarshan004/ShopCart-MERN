const products = require('../data/product.json');
const Product = require('../models/productModel');
const connectDatabase = require('../config/database');
const dotenv = require('dotenv');

dotenv.config({path : 'backend/config/config.env'});
connectDatabase();

const seedProducts = async () => {
    try{
        await Product.deleteMany();
        console.log('Producrts Deleted!');
        await Product.insertMany(products);
        console.log('All Products Added!');
    } catch(error) {
        console.log(error.message);
    }
    process.exit();
}

seedProducts();