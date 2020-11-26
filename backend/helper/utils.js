const bcrypt = require('bcrypt');

const utils = {};

utils.isDefined = (variable) => {
    if (typeof variable === 'boolean') return true;
    return (
        variable !== undefined &&
        typeof variable !== 'undefined' &&
        variable !== null &&
        variable !== ''
    );
};

utils.passwordHash = (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(parseInt(process.env.SALT_ROUND, 2), (error, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                if (err) {
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};

utils.comparePassword = (password, hashPassword) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hashPassword, (err, res) => {
            if (err) {
                reject(err);
            }
            resolve(res);
        });
    });
};

module.exports = utils;
