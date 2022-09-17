const { redisClient } = require('../db');
const CustomError = require('../helpers/create-error');
const { UNAUTHORIZED } = require('../constants');
const HttpStatus = require('http-status-codes');
const jwt = require('jsonwebtoken');
const config = require('config');

const { secret: JWT_SECRET } = config.get('jwt');

/**
 * Check if user authorized
 *
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {NextFunction} next NextFunction
 * @returns {Promise<void>}
 */
async function isAuthorized(req, res, next) {
    try {
        const { authorization } = req.headers;

        if (!authorization) {
            throw new Error(UNAUTHORIZED);
        }

        const decoded = await jwt.verify(authorization, JWT_SECRET);
        console.log('JWT data: ', decoded);

        const data = await redisClient.get(decoded.userId);

        console.log('Redis data: ', data);

        if (!data) {
            throw new Error(UNAUTHORIZED);
        }

        next();
    } catch (err) {
        const unauthorizedError = new CustomError(
            err.message || UNAUTHORIZED,
            HttpStatus.UNAUTHORIZED
        );
        next(unauthorizedError);
    }
}

module.exports = isAuthorized;
