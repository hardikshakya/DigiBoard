const path = require('path');

const express = require('express');

const logger = require('../../helper/logger');
const { ERROR400 } = require('../../constants/common');

const router = express.Router();
const apiVersion = path.basename(__filename, '.js');

router.use((req, res, next) => {
    req.apiVersion = apiVersion;
    return next();
});

// Routes
router.use('/', require('./home/homeRoute'));
router.use('/auth', require('./auth/authRoute'));

router.all('/*', (req, res) => {
    logger.error('Error Log');
    return res.status(ERROR400.CODE).json({
        error: ERROR400.MESSAGE,
        code: ERROR400.CODE,
    });
});

module.exports = router;
