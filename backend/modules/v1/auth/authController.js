const jwt = require('jsonwebtoken');

const logger = require('../../../helper/logger');
const utils = require('../../../helper/utils');
const { STANDARD, ERROR403, ERROR500 } = require('../../../constants/common');
const authService = require('./authService');

const authController = {};

// User SignUp
authController.signUp = async (req, res) => {
    try {
        const encPassword = await utils.passwordHash(req.body.password);

        req.body.password = encPassword;

        await authService.createNewUser(req.body);

        return res.status(STANDARD.SUCCESS).json({
            message: req.t('SUCCESS'),
            code: STANDARD.SUCCESS,
        });
    } catch (error) {
        logger.error('[ERROR] From Main signUp API catch: ', error);
        return res.status(ERROR500.CODE).json({
            error: req.t('TRY_AGAIN'),
            code: ERROR500.CODE,
        });
    }
};

// User LogIn
authController.logIn = async (req, res) => {
    try {
        const isValidPassword = await utils.comparePassword(
            req.body.password,
            req.authUserDetails.password
        );

        if (!isValidPassword) {
            return res.status(ERROR403.CODE).json({
                error: req.t('ERR_PASSWORD_IS_NOT_MATCHED'),
                code: ERROR403.CODE,
            });
        }

        if (req.authUserDetails.verification_string !== null) {
            const verificationString = await jwt.verify(
                req.body.verification_string,
                process.env.JWT_PRIVATE_KEY
            );

            if (
                req.authUserDetails.verification_string ===
                verificationString.verification_string
            ) {
                await authService.validateVerificationString(
                    req.authUserDetails.id
                );
            } else {
                return res.status(ERROR403.CODE).json({
                    error: req.t('ERR_NOT_VALID_VERIFICATION_URL'),
                    code: ERROR403.CODE,
                });
            }
        }

        delete req.authUserDetails.password;

        const token = jwt.sign(
            {
                userId: req.authUserDetails.id,
            },
            process.env.JWT_PRIVATE_KEY
        );
        const data = req.authUserDetails || [];

        return res.status(STANDARD.SUCCESS).json({
            message: req.t('MSG_LOGIN_SUCCESS'),
            data,
            token,
            code: STANDARD.SUCCESS,
        });
    } catch (error) {
        logger.error('[ERROR] From Main logIn API catch: ', error);
        return res.status(ERROR500.CODE).json({
            error: req.t('TRY_AGAIN'),
            code: ERROR500.CODE,
        });
    }
};

module.exports = authController;
