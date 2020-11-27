const userService = require('./userService');
const logger = require('../../../helper/logger');
const {
    ERROR401,
    ERROR403,
    ERROR409,
    ERROR500,
} = require('../../../constants/common');

const userMiddleware = {};

// Check if user with this email is already exists ot not
userMiddleware.isEmailIdExistsOrNot = async (req, res, next) => {
    try {
        const result = await userService.getUserByEmailId(req.body.email);

        if (!result || !result.email) {
            return next();
        }

        return res.status(ERROR409.CODE).json({
            error: req.t('ERR_EMAIL_ALREADY_EXIST'),
            code: ERROR409.CODE,
        });
    } catch (error) {
        logger.error(
            'Error From isEmailIdExistsOrNot() in userMiddleware: ',
            error
        );
        return res.status(ERROR500.CODE).json({
            error: req.t('TRY_AGAIN'),
            code: ERROR500.CODE,
        });
    }
};

// Check if is user exists or not (Find By emailId / JWT token)
userMiddleware.isUserExistsOrNot = async (req, res, next) => {
    try {
        let result = {};

        if (req.body.email) {
            result = await userService.getUserByEmailId(req.body.email);
        } else {
            if (!req.headers.authorization) {
                return res.status(ERROR401.CODE).json({
                    error: req.t('ERR_TOKEN_NOT_FOUND'),
                    code: ERROR401.CODE,
                });
            }

            result = await userService.getUserByToken(
                req.headers.authorization
            );
        }

        if (!result || !result.email) {
            return res.status(ERROR401.CODE).json({
                error: req.t('ERR_USER_NOT_FOUND'),
                code: ERROR401.CODE,
            });
        }

        if (result && result.email) {
            if (!result.is_active) {
                return res.status(ERROR401.CODE).json({
                    error: req.t('ERR_USER_NOT_ACTIVE'),
                    code: ERROR401.CODE,
                });
            }
            if (result.is_active && result.verification_string !== null) {
                if (!req.body.verification_string) {
                    return res.status(ERROR403.CODE).json({
                        error: req.t('ERR_NOT_VALID_VERIFICATION_URL'),
                        code: ERROR403.CODE,
                    });
                }
            }
        }

        const newData = { ...result, userId: result.id };

        req.authUserDetails = newData;
        return next();
    } catch (error) {
        logger.error(
            'Error From isUserExistsOrNot() in userMiddleware: ',
            error
        );
        return res.status(ERROR500.CODE).json({
            error: req.t('TRY_AGAIN'),
            code: ERROR500.CODE,
        });
    }
};

module.exports = userMiddleware;
