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
        const data = await redisClient.get(decoded.userId);

        if (!data) {
            throw new Error(UNAUTHORIZED);
        }

        res.locals.userId = decoded.userId;

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
