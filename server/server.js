const express = require('express');
const axios = require('axios');

const app = express();

app.use('/api/primers/', require('./routes/primers'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
