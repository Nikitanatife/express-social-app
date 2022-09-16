const connectMongoDB = require('./mongo-db');
const redisClient = require('./redis');

module.exports = {
    connectMongoDB,
    redisClient,
};
