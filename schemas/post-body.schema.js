const Joi = require('joi');

/**
 * @typedef {object} PostBodySchema
 * @property {string} body body
 */

const schema = Joi.object({
    body: Joi.string().required(),
});

module.exports = schema;
