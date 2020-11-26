const userService = require('./userService');
const logger = require('../../../helper/logger');
const { ERROR409, ERROR500 } = require('../../../constants/common');

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
