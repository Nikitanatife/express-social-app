const Joi = require('joi');
const { OBJECT_ID_ERROR } = require('../constants');

const schema = Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({ 'string.pattern.base': OBJECT_ID_ERROR });

module.exports = schema;
