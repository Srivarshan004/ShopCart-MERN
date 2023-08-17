const express = require('express');
const multer = require('multer');
const path = require('path');

const upload = multer({storage : multer.diskStorage({
    destination : function(req, file, cb){
        //cb = call back
        cb(null, path.join(__dirname, '..', 'uploads/user' ))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})})

const { 
    userRegister, 
    userLogin, 
    userLogout, 
    forgotPassword, 
    resetPassword, 
    getUserProfile, 
    changePassword,
    updateProfile,
    getAllUsers,
    getSpecificUser,
    updateUser,
    deleteUser
} = require('../controllers/authController');
const { isAuthenticatedUser, authorizeRole } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/register').post(upload.single('avatar'), userRegister);
router.route('/login').post(userLogin);
router.route('/logout').get(userLogout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile);
router.route('/password/change').put(isAuthenticatedUser, changePassword);
router.route('/update').put(isAuthenticatedUser, upload.single('avatar'), updateProfile);

//Admin Routes
router.route('/admin/users').get(isAuthenticatedUser,authorizeRole('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser,authorizeRole('admin'), getSpecificUser);
router.route('/admin/user/:id').put(isAuthenticatedUser,authorizeRole('admin'), updateUser);
router.route('/admin/user/:id').delete(isAuthenticatedUser,authorizeRole('admin'), deleteUser);



module.exports = router;