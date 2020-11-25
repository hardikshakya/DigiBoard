const logger = require('../../../helper/logger');
const { STANDARD, ERROR500 } = require('../../../constants/common');

const homeCtr = {};

// Welcome message
homeCtr.helloMsg = (req, res) => {
    try {
        return res.status(STANDARD.SUCCESS).json({
            message: 'Welcome to DigiBoard app!',
            code: STANDARD.SUCCESS,
        });
    } catch (error) {
        logger.error('[ERROR] From Main home API catch: ', error);
        return res.status(ERROR500.CODE).json({
            error: req.t('TRY_AGAIN'),
            code: ERROR500.CODE,
        });
    }
};

module.exports = homeCtr;
