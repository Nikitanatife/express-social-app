const express = require('express');
const config = require('config');
const cors = require('cors');
const HttpStatus = require('http-status-codes');
const logger = require('morgan');
const connectDB = require('./db');
const { userRouter } = require('./controllers');
const { INTERNAL_SERVER_ERROR } = require('./constants');

const app = express();
const port = config.get('port');
const formatsLogger = app.get('env') === 'dev' ? 'dev' : 'short';

app.use(logger(formatsLogger))
    .use(cors())
    .use(express.json())
    .use('/api/users', userRouter)
    .use((err, req, res, next) => {
        const {
            status = HttpStatus.INTERNAL_SERVER_ERROR,
            message = INTERNAL_SERVER_ERROR,
        } = err;

        console.error(err);
        res.status(status).json({ message });
    })
    .listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
        connectDB();
    });
