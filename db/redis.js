const redis = require('redis');
const {
    redis: { url, password },
} = require('../config');

const client = redis.createClient({
    url,
    password,
});

client.on('connect', () => {
    console.log('Connected to redis instance');
});

module.exports = client;
