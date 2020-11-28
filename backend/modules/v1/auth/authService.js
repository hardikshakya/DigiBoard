const Crypto = require('crypto');

const jwt = require('jsonwebtoken');

const Model = require('../../../models/index');
const logger = require('../../../helper/logger');
const EmailService = require('../../../helper/mail.service');

const authService = {};
const {
    JWT_PRIVATE_KEY,
    SENDGRID_TOKEN,
    SENDGRID_CONFIRMATION_TEMPLATE_ID,
    FRONT_END_URL,
} = process.env;

// Create-Signup New User
authService.createNewUser = async (reqObj) => {
    try {
        const result = await Model.User.create(reqObj);
        const dataValue = result.get({ plain: true });
        const randomString = Crypto.randomBytes(10)
            .toString('base64')
            .slice(0, 10);
        const token = jwt.sign(
            {
                id: dataValue.id,
                verification_string: randomString,
            },
            JWT_PRIVATE_KEY
        );
        const templateData = {
            name: `${dataValue.firstname} ${dataValue.lastname}`,
            link: `${FRONT_END_URL}/login?=${token}`,
        };
        // console.log('link: ', link);

        await Model.User.update(
            {
                verification_string: randomString,
            },
            {
                where: {
                    id: dataValue.id,
                },
            }
        );
        await EmailService.sendMail(
            SENDGRID_TOKEN,
            SENDGRID_CONFIRMATION_TEMPLATE_ID,
            dataValue.email,
            `${dataValue.firstname} ${dataValue.lastname}`,
            templateData
        );

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
