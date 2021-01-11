const express = require('express');
const axios = require('axios');

const app = express();

app.use((req, res, next) => {
	res.header(
		'Access-Control-Allow-Origin',
		'https://wonderful-perlman-679f67.netlify.app'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
});

app.use('/test', require('./routes/test'));
app.use('/api/primers/', require('./routes/primers'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
