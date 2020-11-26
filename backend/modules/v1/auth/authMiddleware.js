const l10n = require('jm-ez-l10n');
const { check } = require('express-validator');

const authMiddleware = {};

// Validate signup api request body
authMiddleware.signUpValidator = () => {
    return [
        check('firstname', l10n.t('ERR_FIRSTNAME_REQUIRED')).exists({
            checkFalsy: true,
        }),
        check('lastname', l10n.t('ERR_LASTNAME_REQUIRED')).exists({
            checkFalsy: true,
        }),
        check('email', l10n.t('ERR_VALID_EMAIL')).isEmail().normalizeEmail(),
        check('password', l10n.t('ERR_PASSWORD_REQUIRED')).exists({
            checkFalsy: true,
        }),
        check('role', l10n.t('ERR_VALID_ROLE')).isIn([
            'publisher',
            'advertiser',
        ]),
    ];
};

module.exports = authMiddleware;
