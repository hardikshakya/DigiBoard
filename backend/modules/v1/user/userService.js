const jwt = require('jsonwebtoken');

const Model = require('../../../models/index');
const logger = require('../../../helper/logger');

const userService = {};

// Find User Details using Email ID
userService.getUserByEmailId = async (email) => {
    try {
        const userData = await Model.User.findOne({
            raw: true,
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

// Find User Details using Token ID
userService.getUserByToken = async (token) => {
    try {
        const decodedObj = await jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        const userData = await Model.User.findOne({
            raw: true,
            where: {
                id: decodedObj.userId,
            },
        });

        return userData;
    } catch (error) {
        logger.error('[ERROR] From getUserByToken in userService: ', error);
        throw new Error(error);
    }
};

module.exports = userService;
