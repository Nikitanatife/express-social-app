const Joi = require('joi');
const { USER_NAME_REG_EX, USER_NAME_ERROR } = require('../../constants');

const namePropertySchema = Joi.string()
    .regex(USER_NAME_REG_EX)
    .min(2)
    .messages({ 'string.pattern.base': USER_NAME_ERROR });

module.exports = namePropertySchema;
