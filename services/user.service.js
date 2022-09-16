const { User } = require('../models');
const CustomError = require('../helpers/create-error');
const HttpStatus = require('http-status-codes');
const { EMAIL_EXIST, WRONG_CREDENTIALS } = require('../constants');
const bcrypt = require('bcrypt');
const config = require('config');
const jwt = require('jsonwebtoken');

const BCRYPT_HASH_ROUNDS = config.get('bcryptHashRounds');
const JWT_SECRET = config.get('jwtSecret');

/**
 * @typedef {object} UserFilter
 * @property {string} email email
 */

/**
 * User service class
 */
class UserService {
    constructor() {
        this.User = User;
    }

    /**
     * Register new user
     *
     * @param {RegisterBodySchema} registerBody RegisterBodySchema
     * @return {Promise<{ user: UserModel, token: string }>}
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
        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        return { user, token };
    }

    /**
     * User log in
     *
     * @param {LoginBodySchema} loginBody
     * @return {Promise<{ user: UserModel, token: string }>}
     */
    async logIn({ email, password }) {
        const user = await this.getOne({ email });

        if (!user) {
            throw new CustomError(WRONG_CREDENTIALS, HttpStatus.BAD_REQUEST);
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            throw new CustomError(WRONG_CREDENTIALS, HttpStatus.BAD_REQUEST);
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET);

        return { user, token };
    }
    async logOut() {}
    async getList() {}
    async getById() {}

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
