const express = require('express');

const app = express();

app.get('api/primers/:id', (req, res) => {
	res.json({ name: 'David' });
});

const port = 5000;

app.listen(port, () => onmouseleave.log(`Server started on port ${port}`));
