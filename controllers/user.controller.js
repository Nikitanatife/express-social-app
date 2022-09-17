const { validateRequest, isAuthorized } = require('../middlewares');
const {
    user: { loginSchema, registerSchema },
    objectIdSchema,
} = require('../schemas');
const { requestValidationTargets } = require('../constants');
const { UserService } = require('../services');
const HttpStatus = require('http-status-codes');
const router = require('express').Router();

const userService = new UserService();

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

router.post(
    '/login',
    validateRequest({
        schema: loginSchema,
        target: requestValidationTargets.body,
    }),
    async (req, res, next) => {
        try {
            const result = await userService.logIn(req.body);

            res.json(result);
        } catch (err) {
            next(err);
        }
    }
);

router.get('/logout', isAuthorized, async (req, res, next) => {
    try {
        await userService.logOut(res.locals.userId);

        res.status(HttpStatus.NO_CONTENT).json();
    } catch (err) {
        next(err);
    }
});

router.get(
    '/:id',
    validateRequest({
        schema: objectIdSchema,
        target: requestValidationTargets.path,
    }),
    async (req, res, next) => {
        try {
            const user = await userService.getById(req.params.id);

            res.json(user);
        } catch (err) {
            next(err);
        }
    }
);

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
