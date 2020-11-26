const jwt = require('jsonwebtoken');

const logger = require('../../../helper/logger');
const utils = require('../../../helper/utils');
const { STANDARD, ERROR500 } = require('../../../constants/common');
const authService = require('./authService');

const authController = {};

// User SignUp
authController.signUp = async (req, res) => {
    try {
        const encPassword = await utils.passwordHash(req.body.password);

        req.body.password = encPassword;

        const result = await authService.createNewUser(req.body);
        const token = jwt.sign(
            {
                userId: result.id,
            },
            process.env.JWT_PRIVATE_KEY
        );

        delete result.password;
        return res.status(STANDARD.SUCCESS).json({
            message: req.t('SUCCESS'),
            data: result,
            token,
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

module.exports = authController;
