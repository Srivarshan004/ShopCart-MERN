const Product = require('../models/productModel');
const catchAsyncError = require('../middlewares/catchAsyncError');
const ErrorHandler = require('../utils/errorHandler');
const APIFeatures = require('../utils/apiFeatures');

//Get Product - /api/v1/products
const getProducts = catchAsyncError(async (req, res, next) => {
    let resPerPage = 4;
    //const apiFeatures = new APIFeatures(Product.find(), req.query).search().fillter().paginate(resPerPage);

    let buildQuery = () => {
        return new APIFeatures(Product.find(), req.query).search().fillter()
    }

    const filteredProductsCount = await buildQuery().query.countDocuments({});
    const totalProductsCount = await Product.countDocuments({});

    let productsCount = totalProductsCount;

    if(filteredProductsCount !== totalProductsCount){
        productsCount = filteredProductsCount;
    }

    const products = await buildQuery().paginate(resPerPage).query;
    // return next(new ErrorHandler('Unable to send product!', 400));

    res.status(200).json({
        success: true,
        count: productsCount,
        resPerPage,
        products
    });
});


//Create New Product - /api/v1/product/new 
const newProducts = catchAsyncError(async (req, res, next) => {
    //Upload images
    let images = []

    let BASE_URL = process.env.BACKEND_URL
    
    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.files.length > 0){
        req.files.forEach(file => {
            let url = `${BASE_URL}/uploads/product/${file.originalname}`;
            images.push({ image : url })
        })
    }

    req.body.images = images;

    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
});

//Get Single Product - /api/v1/product/:id
const getSingleProduct = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate('reviews.user', 'name email');

    if (!product) {

        return next(new ErrorHandler("Product not Found", 400));


        /* return res.status(404).json({
            success : false,
            message : "Product not found"
        }) */
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(201).json({
        success: true,
        product
    })
})

//Update Product - /api/v1/product/:id
const updateProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    //Upload images
    let images = []

    //if images not cleared we keep existing images 
    if(req.body.imagesCleared === 'false'){
        images = product.images;
    }

    let BASE_URL = process.env.BACKEND_URL
    
    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }
    
    if(req.files.length > 0){
        req.files.forEach(file => {
            let url = `${BASE_URL}/uploads/product/${file.originalname}`;
            images.push({ image : url })
        })
    }

    req.body.images = images;


    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });


    res.status(200).json({
        success: true,
        product
    })
})

//Delete Product - /api/v1/product/:id
const deleteProduct = catchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found"
        })
    };

    product = await Product.findByIdAndRemove(req.params.id);

    res.status(200).json({
        success: true,
        message: "Product Deleted!"
    })
})

//Create Review - /api/v1/review
const createReview = catchAsyncError(async (req, res, next) => {
    const { productId, rating, comment } = req.body;

    const review = {
        user: req.user.id,
        rating,
        comment
    }

    const product = await Product.findById(productId);
    //finding user already has reviewed
    const isReviewed = product.reviews.find(review => {
        return review.user.toString() == req.user.id.toString();
    })

    if (isReviewed) {
        //updating the review
        product.reviews.forEach(review => {
            if (review.user.toString() == req.user.id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        //create review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    //Find the average of product reviews
    product.ratings = product.reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / product.reviews.length;
    product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

    await product.save({ validateBeforeSave: false })

    res.status(200).json({
        success: true
    })
})

//Get Reviews - /api/v1/reviews?id={productId}
const getReviews = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id).populate('reviews.user', 'name email');

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Delete Review - /api/v1/review?id={reviewId}&productId={productId}
const deleteReview = catchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    //filltering the reviews which does match the deleting review id
    const reviews = product.reviews.filter(review => {
        return review._id.toString() !== req.query.id.toString()
    });

    //num of reviews
    const numOfReviews = reviews.length;
    //finding the average with the filltered reviews
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings) ? 0 : ratings;
    //save the product updated reviews
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })

    res.status(200).json({
        success: true
    })
})

// get Admin all products - /api/v1/admin/products
const getAdminProducts = catchAsyncError( async (req, res, next) => {
    const products = await Product.find();
    res.status(200).send({
        success : true,
        products
    })
})

module.exports = {
    getProducts,
    newProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    createReview,
    getReviews,
    deleteReview,
    getAdminProducts
};