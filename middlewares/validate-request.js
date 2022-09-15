const { CustomError } = require('../helpers');
const { ObjectSchema } = require('joi');
const HttpStatus = require('http-status-codes');
const { Request, Response, NextFunction } = require('express');

/**
 * @typedef {object} JoiHelperValidationData
 * @property {ObjectSchema} schema Joi schema
 * @property {string} target One of: 'BODY'|'PATH'|'QUERY'
 */

/**
 * Returns Joi schema validation middleware
 *
 * @param {JoiHelperValidationData} validationData Joi validation data
 * @returns {(function(Request, Response, NextFunction): void)} express middleware
 */
const validateRequest =
    ({ schema, target }) =>
    (req, res, next) => {
        let errors = [];

        switch (target) {
            case 'BODY': {
                const { error } = schema.validate(req.body);

                if (error) {
                    errors = errors.concat(error.details);
                }

                break;
            }

            case 'PATH': {
                Object.values(req.params).forEach((value) => {
                    const { error } = schema.validate(value);

                    if (error) {
                        errors = errors.concat(error.details);
                    }
                });

                break;
            }

            case 'QUERY': {
                Object.values(req.query).forEach((value) => {
                    const { error } = schema.validate(value);

                    if (error) {
                        errors = errors.concat(error.details);
                    }
                });

                break;
            }

            default:
                console.log('Unknown target');
        }

        if (errors.length) {
            const message = errors.map(({ message }) => message).join(',\n');
            const customError = new CustomError(
                message,
                HttpStatus.BAD_REQUEST
            );

            console.error('error', customError);
            next(customError);
        } else {
            next();
        }
    };

module.exports = validateRequest;
