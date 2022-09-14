const express = require('express');
const config = require('config');
const cors = require('cors');
const connectDB = require('./db');
const { userRouter } = require('./controllers');

const app = express();
const port = config.get('port');

app.use(cors())
    .use(express.json())
    .use('/api/users', userRouter)
    .listen(port, () => {
        console.log(`Server started on http://localhost:${port}`);
        connectDB();
    });
