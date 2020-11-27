const express = require('express');

const { validationHandler } = require('../../../helper/validate');
const authMiddleware = require('./authMiddleware');
const userMiddleware = require('../user/userMiddleware');
const authController = require('./authController');

const authRouter = express.Router();

// User SignUp
const userSignupMiddlewares = [
    authMiddleware.signUpValidator(),
    validationHandler,
    userMiddleware.isEmailIdExistsOrNot,
    authController.signUp,
];
authRouter.post('/signup', userSignupMiddlewares);

// User Login
const userLoginMiddlewares = [
    authMiddleware.logInValidator(),
    validationHandler,
    userMiddleware.isUserExistsOrNot,
    authController.logIn,
];
authRouter.post('/login', userLoginMiddlewares);

module.exports = authRouter;
