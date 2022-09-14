const mongoose = require('mongoose');
const {
    emailRegEx,
    emailError,
    passwordRegEx,
    passwordError,
    nameRegEx,
    nameError,
    urlRegEx,
    urlError,
} = require('../constants');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            match: [emailRegEx, emailError],
        },
        password: {
            type: String,
            required: true,
            trim: true,
            minlength: 8,
            match: [passwordRegEx, passwordError],
        },
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            trim: true,
            match: [nameRegEx, nameError],
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            trim: true,
            match: [nameRegEx, nameError],
        },
        birthDay: { type: Date },
        imageURL: {
            type: String,
            required: true,
            trim: true,
            default:
                'https://res.cloudinary.com/freeman999/image/upload/v1589014461/noAvatar2_skj96w.png',
            match: [urlRegEx, urlError],
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
