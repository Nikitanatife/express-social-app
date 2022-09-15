const { INTERNAL_SERVER_ERROR } = require('../constants');
const HttpStatus = require('http-status-codes');

/**
 * Custom error class
 */
class CustomError extends Error {
    /**
     * Create custom error
     *
     * @param {string} message error text
     * @param {number} status error status
     */
    constructor(message, status) {
        super();

        /**
         * @type {string}
         */
        this.name = this.constructor.name;
        /**
         * @type {string}
         */
        this.message = message || INTERNAL_SERVER_ERROR;
        /**
         * @type {number}
         */
        this.status = status || HttpStatus.INTERNAL_SERVER_ERROR;
    }
}

module.exports = CustomError;
