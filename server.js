const express = require('express');
const config = require('config');
const connectDB = require('./db');

const app = express();
const port = config.get('port');

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
    connectDB();
});
