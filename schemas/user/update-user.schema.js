const Joi = require('joi');
const namePropertySchema = require('./name.schema');

/**
 * @typedef {object} UpdateUserSchema
 * @property {string} firstName firstName
 * @property {string} lastName lastName
 * @property {Date} birthDay birthDay
 * @property {string} bio bio
 * @property {string} website website
 * @property {string} location location
 */

const schema = Joi.object({
    firstName: namePropertySchema,
    lastName: namePropertySchema,
    birthDay: Joi.date()
        .iso()
        .min(new Date().setFullYear(1900))
        .max(new Date().setFullYear(new Date().getFullYear())),
    bio: Joi.string(),
    website: Joi.string().uri(),
    location: Joi.string(),
});

module.exports = schema;
