const ENV = process.env.NODE_ENV || 'dev';

require('dotenv').config({ path: `.${ENV}.env` });

const {
    PORT,
    MONGO_DB_URL,
    MONGO_BD_DATABASE,
    BCRYPT_HASH_ROUNDS,
    JWT_SECRET,
    JWT_EXP,
    REDIS_URT,
    REDIS_PASSWORD,
} = process.env;

module.exports = {
    port: Number(PORT) || 8080,
    mongoDB: {
        url: MONGO_DB_URL,
        dbName: MONGO_BD_DATABASE,
    },
    bcryptHashRounds: Number(BCRYPT_HASH_ROUNDS) || 10,
    jwt: {
        secret: JWT_SECRET,
        expiration: Number(JWT_EXP) || 42,
    },
    redis: {
        url: REDIS_URT,
        password: REDIS_PASSWORD,
    },
};
