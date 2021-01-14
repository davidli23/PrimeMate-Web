const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use('/test', require('./routes/test'));
app.use('/api/primers', require('./routes/primers'));

app.listen(port, () => console.log(`Server started on port ${port}`));
