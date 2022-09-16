const { validateRequest } = require('../middlewares');
const { registerSchema } = require('../schemas/user');
const { requestValidationTargets } = require('../constants');
const { UserService } = require('../services');
const HttpStatus = require('http-status-codes');
const router = require('express').Router();

const userService = new UserService();

router.get('/', async (req, res, next) => {
    try {
        res.send('Get all users');
    } catch (err) {
        next(err);
    }
});

router.post(
    '/register',
    validateRequest({
        schema: registerSchema,
        target: requestValidationTargets.body,
    }),
    async (req, res, next) => {
        try {
            const result = await userService.register(req.body);

            res.status(HttpStatus.CREATED).json(result);
        } catch (err) {
            next(err);
        }
    }
);

router.post('/login', async (req, res, next) => {
    try {
        res.send('User login');
    } catch (err) {
        next(err);
    }
});

router.get('/logout', async (req, res, next) => {
    try {
        res.send('User logout');
    } catch (err) {
        next(err);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        res.send('Get user by id');
    } catch (err) {
        next(err);
    }
});

router.delete('/:id', (req, res, next) => {
    try {
        res.send('Delete user');
    } catch (err) {
        next(err);
    }
});

// upload user profile image avatar
router.patch('/image', async (req, res, next) => {
    try {
        res.send('Upload image');
    } catch (err) {
        next(err);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        res.send('Update user profile');
    } catch (err) {
        next(err);
    }
});

module.exports = router;
