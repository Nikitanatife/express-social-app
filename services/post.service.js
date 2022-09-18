const { Post } = require('../models');

/**
 * Post service class
 */
class PostService {
    constructor() {
        this.Post = Post;
    }

    /**
     * Create new post
     *
     * @param {string} userId userId
     * @param {PostBodySchema} body body
     * @returns {Promise<PostModel>} post
     */
    async create(userId, body) {
        return this.Post.create({ userId, ...body });
    }
    async getList() {}
    async getById() {}
    async delete() {}
    async update() {}
}

module.exports = PostService;
