//Authenticate Controller
const catchAsyncError = require('../middlewares/catchAsyncError');
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const ErrorHandlor = require('../utils/errorHandler');
const sendToken = require('../utils/jwt');
const crypto = require('crypto');

//User Register - /api/v1/register
const userRegister = catchAsyncError( async(req, res, next) => {
    const { name, email, password } = req.body;

    let avatar;

    let BASE_URL = process.env.BACKEND_URL

    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.file){
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`
    }

    const user = await User.create({
        name, email, password, avatar
    });

    sendToken(user, 201, res);

    /*const token = user.getJwtToken();
    res.status(201).json({
        success : true,
        user,
        token
    });*/
})

//User Login - /api/v1/login
const userLogin = catchAsyncError( async (req, res, next) => {
    const {email, password} = req.body;

    if(!email || !password){
        return next(new ErrorHandlor('Please enter email & password'))
    }

    //find the user database
    const user = await User.findOne({email}).select('+password');

    if(!user){
        return next(new ErrorHandlor('Invalid email or password', 401));
    }

    if(!await user.isValidPassword(password)){
        return next(new ErrorHandlor('Invalid email or password', 401));
    }

    sendToken(user, 201, res);

})

//User Logout - /api/v1/logout
const userLogout = (req, res,  next) => {
    res.cookie('token', null, {
        expires : new Date(Date.now()),
        httpOnly : true
    }).status(200).json({
        success : true,
        message : "Logged Out"
    })
}

//Fogot Password - /api/v1/password/forgot
const forgotPassword = catchAsyncError( async (req, res, next) => {
    const user = await User.findOne({email : req.body.email});

    if(!user){
        return next(new ErrorHandlor('User not found eith this email', 404));
    }
    const resetToken = user.getResetToken();
    await user.save({validateBeforeSave : false})

    let BASE_URL = process.env.FRONTEND_URL
    
    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    //create password reset url
    const resetUrl = `${BASE_URL}/password/reset/${resetToken}`;

    const message = `Your password reset url is as follows \n\n
    ${resetUrl} \n\n If you have not requsted this email, then ignore it.`

    try{
        sendEmail({
            email : user.email,
            subject : 'ShopCart Password Recovery',
            message
        })

        res.status(200).json({
            success : true,
            message : `Email send to ${user.email}`
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({validateBeforeSave : false});
        return next(new ErrorHandlor(error.message, 500));
    }
})

//Reset Password - /api/v1/password/reset/:token
const resetPassword = catchAsyncError( async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordTokenExpire : {
            $gt : Date.now()
        }
    })

    if(!user){
        return next(new ErrorHandlor('Password Reset Token is Invalid or Expired'));
    }

    if(req.body.password != req.body.confirmPassword){
        return next(new ErrorHandlor('password does not match'));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpire = undefined;
    user.save({validateBeforeSave : false});

    sendToken(user, 201, res);
})

//Get User Profile - /api/v1/myprofile
const getUserProfile = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.user.id);
    res.status(200).json({
        success : true,
        user
    });
})

//User Change Password - /api/v1/password/change
const changePassword = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    //check old password
    if(! await user.isValidPassword(req.body.oldPassword)){
        return next(new ErrorHandlor('Old Password is Incorrect'), 401);
    }

    //Assigning New Password
    user.password = req.body.password;
    await user.save();
    res.status(200).json({
        success : true,
    });
})

//User Update Profile - /api/v1/update
const updateProfile = catchAsyncError( async (req, res, next) => {
    let newUserData = {
        name : req.body.name,
        email : req.body.email
    }

    let avatar;

    let BASE_URL = process.env.BACKEND_URL
    
    if(process.env.NODE_ENV === 'production'){
        BASE_URL = `${req.protocol}://${req.get('host')}`
    }

    if(req.file){
        avatar = `${BASE_URL}/uploads/user/${req.file.originalname}`;
        newUserData = {...newUserData, avatar}
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new : true,
        runValidators : true
    });

    res.status(200).json({
        success : true,
        user
    })
})

//Admin: Get All Users - /api/v1/admin/users
const  getAllUsers = catchAsyncError( async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success : true,
        users
    })
})

//Admin: Get Specific User - /api/v1/admin/user/:id
const getSpecificUser = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandlor(`user not found with this id : ${req.params.id}`));
    }

    res.status(200).json({
        success : true,
        user
    })
})

//Admin: Update User - /api/v1/admin/user/:id
const updateUser = catchAsyncError( async (req, res, next) => {
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    }

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new : true,
        runValidators : true
    });

    res.status(200).json({
        success : true,
        user
    })
})

//Admin: Delete User - /api/v1/admin/user/:id
const deleteUser = catchAsyncError( async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if(!user){
        return next(new ErrorHandlor(`user not found with this id : ${req.params.id}`));
    }

    await user.deleteOne();


    res.status(200).json({
        success : true,
    })
})

module.exports = { 
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
};