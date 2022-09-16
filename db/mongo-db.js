const { connect } = require('mongoose');
const config = require('config');

const { url, dbName } = config.get('mongoDB');

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
