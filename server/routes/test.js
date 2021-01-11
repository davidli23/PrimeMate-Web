const express = require('express');
const router = express.Router();
const primers = require('../controllers/primers/primers');

router.get('/', (req, res) => {
	res.json({ text: 'This is a test' });
});

module.exports = router;
