const { validateRequest, isAuthorized } = require('../middlewares');
const { postBodySchema } = require('../schemas');
const { requestValidationTargets } = require('../constants');
const router = require('express').Router();
const { PostService } = require('../services');
const HttpStatus = require('http-status-codes');

const postService = new PostService();

router.get('/', async (req, res, next) => {
    try {
        res.send('Get all posts');
    } catch (err) {
        next(err);
    }
});

router.post(
    '/',
    isAuthorized,
    validateRequest({
        schema: postBodySchema,
        target: requestValidationTargets.body,
    }),
    async (req, res, next) => {
        try {
            const post = await postService.create(res.locals.userId, req.body);

            res.status(HttpStatus.CREATED).json(post);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/:id', async (req, res, next) => {
    try {
        res.send('Get post by id');
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        res.send('Delete post');
    } catch (err) {
        next(err);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        res.send('Delete post');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
