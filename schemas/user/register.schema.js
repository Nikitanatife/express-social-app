const loginSchema = require('./login.schema');
const Joi = require('joi');
const { USER_NAME_REG_EX, USER_NAME_ERROR } = require('../../constants');

/**
 * @typedef {object} RegisterBodySchema
 * @property {string} email email
 * @property {string} password password
 * @property {string} firstName firstName
 * @property {string} lastName lastName
 */

const namePropertySchema = Joi.string()
    .regex(USER_NAME_REG_EX)
    .min(2)
    .required()
    .messages({ 'string.pattern.base': USER_NAME_ERROR });

const schema = loginSchema.keys({
    firstName: namePropertySchema,
    lastName: namePropertySchema,
});

module.exports = schema;
