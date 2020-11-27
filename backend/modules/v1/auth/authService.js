const Model = require('../../../models/index');
const logger = require('../../../helper/logger');

const authService = {};

// Create-Signup New User
authService.createNewUser = async (reqObj) => {
    try {
        const result = await Model.User.create(reqObj);
        const dataValue = result.get({ plain: true });

        return dataValue;
    } catch (error) {
        logger.error('[ERROR] From createNewUser in authService: ', error);
        throw new Error(error);
    }
};

// Validate User's Verification String
authService.validateVerificationString = async (userId) => {
    try {
        await Model.User.update(
            {
                verification_string: null,
            },
            {
                where: {
                    id: userId,
                },
            }
        );

        return;
    } catch (error) {
        logger.error(
            '[ERROR] From validateVerificationString in authService: ',
            error
        );
        throw new Error(error);
    }
};

module.exports = authService;
