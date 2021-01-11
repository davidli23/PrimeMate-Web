const express = require('express');
const router = express.Router();
const primers = require('../controllers/primers/primers');

router.get('/', (req, res) => {
	res.send('hello');
});

module.exports = router;
