const express = require('express');

const app = express();
const port = 5001;

app.listen(port, () =>
    console.log(`Server started on http://localhost:${port}`)
);
