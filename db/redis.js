const redis = require('redis');
const config = require('config');

const { url, password } = config.get('redis');

const client = redis.createClient({
    url,
    password,
});

client.on('connect', () => {
    console.log('Connected to redis instance');
});

module.exports = client;
