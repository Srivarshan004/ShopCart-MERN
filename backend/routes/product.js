const express = require('express');
const multer = require('multer');
const path = require('path');

const upload = multer({storage : multer.diskStorage({
    destination : function(req, file, cb){
        //cb = call back
        cb(null, path.join(__dirname, '..', 'uploads/product' ))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})})

const { 
    getProducts, 
    newProducts, 
    getSingleProduct, 
    updateProduct, 
    deleteProduct, 
    createReview,
    getReviews,
    deleteReview,
    getAdminProducts
 } = require('../controllers/productController');
const  {isAuthenticatedUser, authorizeRole}  = require('../middlewares/authenticate');
const router = express.Router();

router.route('/products').get( getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/:id').put(updateProduct);

//product Review
router.route('/review').put(isAuthenticatedUser, createReview);

//Admin Routes
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRole('admin'), upload.array('images'), newProducts);
router.route('/admin/products').get(isAuthenticatedUser, authorizeRole('admin'), getAdminProducts);
router.route('/admin/product/:id').delete(isAuthenticatedUser, authorizeRole('admin'), deleteProduct);
router.route('/admin/product/:id').put(isAuthenticatedUser, authorizeRole('admin'),upload.array('images'), updateProduct);
router.route('/admin/reviews').get(isAuthenticatedUser, authorizeRole('admin'), getReviews);
router.route('/admin/review').delete(isAuthenticatedUser, authorizeRole('admin'), deleteReview);

module.exports = router;