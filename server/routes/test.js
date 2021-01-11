const express = require('express');
const router = express.Router();
const primers = require('../controllers/primers/primers');

router.get('/', (req, res) => {
	res.json({ text: 'hello' });
});

module.exports = router;
