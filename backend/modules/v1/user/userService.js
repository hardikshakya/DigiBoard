const Model = require('../../../models/index');
const logger = require('../../../helper/logger');

const userService = {};

userService.getUserByEmailId = async (email) => {
    try {
        const userData = await Model.User.findOne({
            where: {
                email,
            },
        });

        return userData || null;
    } catch (error) {
        logger.error('[ERROR] From getUserByEmailId in userService: ', error);
        throw new Error(error);
    }
};

module.exports = userService;
