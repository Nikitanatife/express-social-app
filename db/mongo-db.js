const { connect } = require('mongoose');
const {
    mongoDB: { url, dbName },
} = require('../config');

/**
 * Connect mongoDB
 *
 * @returns {void}
 */
function connectMongoDB() {
    connect(
        url,
        {
            // useNewUrlParser: true,
            // useCreateIndex: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false,
            dbName,
        },
        (e) => {
            if (e) throw new Error(e);

            console.log('MongoDB has connected successfully.');
        }
    );
}

module.exports = connectMongoDB;
