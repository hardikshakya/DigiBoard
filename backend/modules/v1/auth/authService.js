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

module.exports = authService;
