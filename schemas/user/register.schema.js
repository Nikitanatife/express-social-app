const loginSchema = require('./login.schema');
const namePropertySchema = require('./name.schema');

/**
 * @typedef {object} RegisterBodySchema
 * @property {string} email email
 * @property {string} password password
 * @property {string} firstName firstName
 * @property {string} lastName lastName
 */

const schema = loginSchema.keys({
    firstName: namePropertySchema.required(),
    lastName: namePropertySchema.required(),
});

module.exports = schema;
