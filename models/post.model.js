const { Schema, model } = require('mongoose');

/**
 * @typedef {object} PostModel
 * @property {string} _id id
 * @property {string} body body
 * @property {UserModel} user user
 * @property {Date} createdAt createdAt
 * @property {Date} updatedAt updatedAt
 */

const postSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Post = model('Post', postSchema);

module.exports = Post;
