require('dotenv').config();

module.exports = {
    development: {
        username: process.env.DEV_DB_USER_NAME,
        password: process.env.DEV_DB_PASSWORD,
        database: process.env.DEV_DB_DATABASE,
        host: process.env.DEV_DB_HOST,
        dialect: 'postgres',
    },
    test: {
        username: process.env.TEST_USERNAME,
        password: process.env.TEST_PASSWORD,
        database: process.env.TEST_DATABASE,
        host: process.env.TEST_DATABASE_URL,
        dialect: 'postgres',
    },
    production: {
        username: process.env.PROD_USERNAME,
        password: process.env.PROD_PASSWORD,
        database: process.env.PROD_DATABASE,
        host: process.env.PROD_DATABASE_URL,
        dialect: 'postgres',
    },
};
