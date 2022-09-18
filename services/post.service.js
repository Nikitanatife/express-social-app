const { Post } = require('../models');

/**
 * Post service class
 */
class PostService {
    constructor() {
        this.Post = Post;
    }

    async create() {}
    async getList() {}
    async getById() {}
    async delete() {}
    async update() {}
}

module.exports = PostService;
