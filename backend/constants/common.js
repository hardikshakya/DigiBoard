const STANDARD = {
    CREATED: 201,
    SUCCESS: 200,
    NOCONTENT: 204,
};

const ERROR400 = {
    CODE: 400,
    MESSAGE: 'BAD_REQUEST',
};

const ERROR401 = {
    CODE: 401,
    MESSAGE: 'UNAUTHORIZED',
};

const ERROR403 = {
    CODE: 403,
    MESSAGE: 'FORBIDDEN_ACCESS',
};

const ERROR404 = {
    CODE: 404,
    MESSAGE: 'NOT_FOUND',
};

const ERROR409 = {
    CODE: 409,
    MESSAGE: 'DUPLICATE_FOUND',
};

const ERROR422 = 422;

const ERROR500 = {
    CODE: 500,
    MESSAGE: 'TRY_AGAIN',
};

module.exports = {
    STANDARD,
    ERROR400,
    ERROR401,
    ERROR403,
    ERROR404,
    ERROR409,
    ERROR422,
    ERROR500,
};
