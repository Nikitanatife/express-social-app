const regex = require('./regex');
const messages = require('./messages');
const requestValidationTargets = require('./request-validation-targets');

module.exports = {
    ...regex,
    ...messages,
    requestValidationTargets,
};
