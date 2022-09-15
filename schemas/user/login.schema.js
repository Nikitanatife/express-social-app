const Joi = require('joi');
const { PASSWORD_REG_EX, PASSWORD_ERROR } = require('../../constants');

const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .regex(PASSWORD_REG_EX)
        .required()
        .messages({ 'string.pattern.base': PASSWORD_ERROR }),
});

module.exports = schema;
