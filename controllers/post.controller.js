const router = require('express').Router();

router.get('/', async (req, res, next) => {
    try {
        res.send('Get all posts');
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        res.send('Create new post');
    } catch (err) {
        next(err);
    }
});

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
