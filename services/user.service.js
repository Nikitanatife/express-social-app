const { User } = require('../models');
const CustomError = require('../helpers/create-error');
const HttpStatus = require('http-status-codes');
const {
    EMAIL_EXIST,
    WRONG_CREDENTIALS,
    ALREADY_LOGGED_IN,
    USER_NOT_FOUND,
} = require('../constants');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');
const { redisClient } = require('../db');

const BCRYPT_HASH_ROUNDS = config.get('bcryptHashRounds');
const { secret: JWT_SECRET, expiration: JWT_EXPIRATION } = config.get('jwt');

/**
 * @typedef {object} UserFilter
 * @property {string} email email
 * @property {string} _id id
 */

/**
 * User service class
 */
class UserService {
    constructor() {
        this.User = User;
        this.redis = redisClient;
    }

    /**
     * Register new user
     *
     * @param {RegisterBodySchema} registerBody RegisterBodySchema
     * @returns {Promise<{ user: UserModel, token: string }>} returns user and token
     */
    async register({ email, password, ...args }) {
        const existingUser = await this.getOne({ email });

        if (existingUser) {
            throw new CustomError(EMAIL_EXIST, HttpStatus.CONFLICT);
        }

        const salt = await bcrypt.genSalt(BCRYPT_HASH_ROUNDS);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await this.User.create({
            email,
            password: hashedPassword,
            ...args,
        });
        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION,
        });

        await this.redis.setEx(user.id, JWT_EXPIRATION, token);

        return { user, token };
    }

    /**
     * User log in
     *
     * @param {LoginBodySchema} loginBody loginBody
     * @returns {Promise<{ user: UserModel, token: string }>} returns user and token
     */
    async logIn({ email, password }) {
        const user = await this.getOne({ email });

        if (!user) {
            throw new CustomError(WRONG_CREDENTIALS, HttpStatus.BAD_REQUEST);
        }

        const authData = await this.redis.get(user.id);

        if (authData) {
            throw new CustomError(ALREADY_LOGGED_IN, HttpStatus.BAD_REQUEST);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new CustomError(WRONG_CREDENTIALS, HttpStatus.BAD_REQUEST);
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION,
        });

        await this.redis.setEx(user.id, JWT_EXPIRATION, token);

        return { user, token };
    }

    /**
     * User Log Out
     *
     * @param {string} userId userId
     * @returns {Promise<void>}
     */
    async logOut(userId) {
        await this.redis.del(userId);
    }

    /**
     * Get user by id
     *
     * @param {string} id userId
     * @returns {Promise<UserModel>} user
     */
    async getById(id) {
        const user = await this.getOne({ _id: id });

        if (!user) {
            throw new CustomError(USER_NOT_FOUND, HttpStatus.NOT_FOUND);
        }

        return user;
    }

    /**
     * Get one user instance
     *
     * @param {UserFilter} filter filter object
     * @returns {Promise<UserModel>} user instance
     */
    async getOne(filter) {
        return this.User.findOne(filter);
    }
    async delete() {}
    async update() {}
    async uploadImage() {}
}

module.exports = UserService;
