const mongoose = require('mongoose');
const {
    EMAIL_REG_EX,
    EMAIL_ERROR,
    PASSWORD_REG_EX,
    PASSWORD_ERROR,
    USER_NAME_REG_EX,
    USER_NAME_ERROR,
    URL_REG_EX,
    URL_ERROR,
} = require('../constants');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [EMAIL_REG_EX, EMAIL_ERROR],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            match: [PASSWORD_REG_EX, PASSWORD_ERROR],
        },
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            trim: true,
            match: [USER_NAME_REG_EX, USER_NAME_ERROR],
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            trim: true,
            match: [USER_NAME_REG_EX, USER_NAME_ERROR],
        },
        birthDay: { type: Date },
        imageURL: {
            type: String,
            required: true,
            trim: true,
            default:
                'https://res.cloudinary.com/freeman999/image/upload/v1589014461/noAvatar2_skj96w.png',
            match: [URL_REG_EX, URL_ERROR],
        },
        bio: { type: String },
        website: { type: String },
        location: { type: String },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
