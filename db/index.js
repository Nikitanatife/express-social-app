const { connect } = require('mongoose');
const config = require('config');

const mongoURL = config.get('mongoURL');

/**
 * Connect mongoDB
 *
 * @returns {void}
 */
function connectDB() {
    connect(
        mongoURL,
        {
            // useNewUrlParser: true,
            // useCreateIndex: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false,
        },
        (e) => {
            if (e) throw new Error(e);

            console.log('MongoDB has connected successfully.');
        }
    );
}

module.exports = connectDB;
